# 语音转文字 

语音转文字 模型地址: https://github.com/FunAudioLLM/SenseVoice
文字转语音 https://github.com/rany2/edge-tts

```
<!-- 参数 -->
const prompt = {
      input: {
        type: 'speech2text', // speech2text 语音转文字     text2speech 文字转语音
        file: '', // base64音频或需朗读的文字
      }
    };

<!-- 响应结果 -->
{data: '结果'}
```
