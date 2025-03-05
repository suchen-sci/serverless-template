# 语音转文字 

语音转文字 模型地址: https://github.com/FunAudioLLM/SenseVoice

文字转语音 https://github.com/rany2/edge-tts

```
<!-- 参数 -->
const prompt = {
      input: {
        type: 'speech2text', // speech2text 语音转文字     text2speech 文字转语音
        file: '', // base64音频或需朗读的文字 
        voice: '', // 音色  默认zh-CN-XiaoxiaoNeural 
      }
    };

<!-- 响应结果 -->
{data: '结果'}
```
```
Name: zh-CN-XiaoxiaoNeural Gender: Female
Name: zh-CN-XiaoyiNeural Gender: Female
Name: zh-CN-YunjianNeural Gender: Male
Name: zh-CN-YunxiNeural Gender: Male
Name: zh-CN-YunxiaNeural Gender: Male
Name: zh-CN-YunyangNeural Gender: Male
Name: zh-CN-liaoning-XiaobeiNeural Gender: Female
Name: zh-CN-shaanxi-XiaoniNeural Gender: Female
Name: zh-HK-HiuGaaiNeural Gender: Female
Name: zh-HK-HiuMaanNeural Gender: Female
Name: zh-HK-WanLungNeural Gender: Male
Name: zh-TW-HsiaoChenNeural Gender: Female
Name: zh-TW-HsiaoYuNeural Gender: Female
Name: zh-TW-YunJheNeural Gender: Male
Name: zu-ZA-ThandoNeural Gender: Female
Name: zu-ZA-ThembaNeural Gender: Male
```