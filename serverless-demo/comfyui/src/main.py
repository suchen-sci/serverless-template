import os
import logging
from typing import Any, Dict
import time
import uuid
from spirit_gpu import start, Env
from comfyui_client import ComfyUIClient
import json
from PIL import Image
from typing import List
from prompt import prompt_text

def config_logging():
    console = logging.StreamHandler()
    console.setLevel(logging.DEBUG)
    logging.basicConfig(level=logging.INFO, 
                        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', 
                        datefmt='%Y-%m-%d %H:%M:%S', 
                        handlers=[console])

def to_base64(images: Image.Image):
    import io
    import base64

    im = images.convert("RGB")
    with io.BytesIO() as output:
        im.save(output, format="PNG")
        contents = output.getvalue()
        return base64.b64encode(contents).decode("utf-8")
    
def create_prompt(prompt_obj: dict):

    logging.info(f"prompt_obj is {prompt_obj}")
    prompt = json.loads(prompt_text)

    # node ids which will be changed during the prompt creation
    keywords_input_node = '16'
    size_input_node = '53'
    model_input_node = '4'

    prompt[keywords_input_node]["inputs"]["text"] = prompt_obj.get('keywords', '')
    prompt[size_input_node]["inputs"]["width"] = prompt_obj.get('width', 512)
    prompt[size_input_node]["inputs"]["height"] = prompt_obj.get('height', 512)
    prompt[model_input_node]["inputs"]["ckpt_name"] = 'sd3.5_large_fp8_scaled.safetensors' if prompt_obj.get('isLarge', True)  else 'sd3.5_medium_incl_clips_t5xxlfp8scaled.safetensors'

    return prompt

def process_images(data_list: List[str]):
    base64_images = []

    for item in data_list:
        logging.info(f"json load before {item}")
        parsed_data = json.loads(item)
        logging.info(f"json load after {parsed_data}")

        # 检查执行类型并提取图像数据
        if parsed_data.get("type") == "executed" and "output" in parsed_data.get("data", {}):
            output_images = parsed_data["data"]["output"]["images"]

            for img_info in output_images:
                filename = img_info["filename"]
                subfolder = img_info["subfolder"]

                # 构造图像文件的完整路径
                image_path = os.path.join(subfolder,'output', filename)
                logging.info(f"image_path: {image_path}")
                # 打开图像文件并转换为 Base64
                try:
                    with Image.open(image_path) as img:
                        logging.info(f"image open : {img}")
                        base64_str = to_base64(img)
                        base64_images.append(base64_str)
                except Exception as e:
                    print(f"Error processing image {image_path}: {e}")
    
    return base64_images

def start_handler():
    config_logging()
    
    def handler(request: Dict[str, Any], _: Env):
        request_input = request.get("input", {})
        prompt = json.loads(request_input.get("prompt"))
        prompt = create_prompt(prompt)
        client_id = str(uuid.uuid4())
        server_host = os.getenv("COMFYUI_SERVER_HOST", "127.0.0.1")
        server_port = os.getenv("COMFYUI_SERVER_PORT", "8188")
        output_node = request_input.get("output_node", "9")
        secure = request_input.get("secure", False)
        print(f"ip ----------- {server_host}:{server_port}")

        # 实例化ComfyUIClient
        client = ComfyUIClient(server_host=server_host, server_port=server_port, output_node=output_node, secure=secure)
        
        logging.info(f"Received request with prompt: {prompt}")
        
        # 调用ComfyUIClient生成图片
        try:
            prompt_id = client.queue_prompt(prompt, client_id)
            logging.info(f"Prompt queued with ID: {prompt_id}")
            
            # 获取生成的图像
            images = client.get_images(client_id=client_id, prompt_id=prompt_id)
            logging.info(f"Generated images for prompt ID {prompt_id}")
            logging.info(f"Generated images data {images}")
            images_base64 = process_images(images)

            logging.info(f"Generated images base64 data {images_base64}")
            # 返回生成结果
            response = {
                "status": "success",
                "prompt_id": prompt_id,
                "image": images_base64[0]
            }

        except Exception as e:
            logging.error(f"Error generating images: {e}")
            response = {
                "status": "error",
                "message": str(e)
            }
        client.close()
        return json.dumps(response)

    return handler

# 启动应用程序
start({"handler": start_handler()})
