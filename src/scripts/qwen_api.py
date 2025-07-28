from flask import Flask, request, jsonify
from llama_cpp import Llama
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

llm = Llama(
    model_path="../../../../workspace/llm/models/qwen/qwen1_5-7b-chat-q8_0.gguf",
    n_ctx=2048,
    n_gpu_layers=99,
    use_mlock=True
)

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        response = llm(prompt, max_tokens=512, stop=["\n"])
        print(f"Raw response from llm: {response}")  # 打印原始响应
        text = response['choices'][0]['text']  # 提取 text 字段
        return jsonify({'choices': [{'text': text}]})  # 返回 JSON

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=11434)

