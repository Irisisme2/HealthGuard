from flask import Flask, request, jsonify
from flask_cors import CORS
import vertexai
from vertexai.generative_models import GenerativeModel, SafetySetting

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from your frontend

vertexai.init(project="healthguard-431701", location="us-central1")
model = GenerativeModel("gemini-1.5-flash-001")

@app.route('/api/data', methods=['POST'])
def handle_data():
    data = request.json
    type_ = data.get('type')
    period = data.get('period')
    content = data.get('data')

    # Format the data into a string to send to the model
    formatted_data = format_data(type_, period, content)

    # Generowanie odpowiedzi z modelu
    generation_config = {
        "max_output_tokens": 8192,
        "temperature": 0,
        "top_p": 0,
    }

    safety_settings = [
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        ),
    ]

    responses = model.generate_content(
        [formatted_data],
        generation_config=generation_config,
        safety_settings=safety_settings,
        stream=True,
    )

    # Collect responses
    response_text = "".join(response.text for response in responses)
    return jsonify({"explanation": response_text})

def format_data(type_, period, data):
    # Format data to include type and period
    formatted_data = f"Data Type: {type_}, Period: {period}\n"
    for entry in data:
        formatted_data += ', '.join(f"{k}: {v}" for k, v in entry.items()) + '\n'
    return formatted_data

if __name__ == '__main__':
    app.run(port=5000)
