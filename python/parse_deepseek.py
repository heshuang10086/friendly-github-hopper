# -*- coding: utf-8 -*-
try:
    from langchain_community.document_loaders import PyPDFLoader
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "langchain-community"])

    from langchain_community.document_loaders import PyPDFLoader
# pip install pypdf
# pip install rapidocr-onnxruntime 

import json

def load_pdf_content(filepath: str) -> str:
    """
    加载PDF文件内容并返回拼接后的字符串
    
    参数:
        filepath: PDF文件路径
        
    返回:
        拼接后的PDF文本内容
    """
    loader = PyPDFLoader(
        file_path=filepath,
        extract_images=True,
    )
    docs = []
    docs_lazy = loader.lazy_load()
    for doc in docs_lazy:
        docs.append(doc.page_content)
    return ''.join(docs)

filepath = '潘洁-北京理工大学.pdf'
data = load_pdf_content(filepath)
print(data)


system_prompt = f"""
    你是人事资源管理部门的优秀员工，请你根据简历，帮我提取候选人简历中的关键信息，用JSON格式返回给我，我需要的字段是：姓名、手机号、邮箱、工作年限、期望工作地、期望职位、教育背景、自我介绍、获得奖项、个人技能、工作经历、项目经历。简历中没有提到的字段也要输出，但字段值为空。json的key可以使用中文。当key为教育背景时，它对应的值是一个列表，列表中是一个有三个键值对的字典，分别是毕业院校、所学专业、求学起止时间（以yyyy.mm.dd,yyyy.mm.dd格式输出）、学术水平（本科、研究生、专科、博士等）；当key为获得奖项时，它对应的值是一个列表，列表中有多个字典（字典个数根据简历判断总结），每个字典内有两个键值对，分别是奖项名称、获奖时间（格式为yyyy）；当key为个人技能是，它对应的值是一个列表，列表内有多个字典（字典个数根据简历判断总结），每个字典内有三个键值对，分别是技能项名称、掌握程度（以百分比显示）、技能描述；当key为工作经历时，它对应的值是一个列表，列表内有多个字典（字典个数根据简历判断总结），每个字典有四个键值对，分别是工作起止时间(yyyy.mm.dd,yyyy.mm.dd格式，无法判断时可以只有开始或者截止时间）、公司名称、工作部门、职位描述；当key为项目经历时，它对应的值是一个列表，列表中有多个字典（字典个数根据简历判断总结），每个字典有5个键值对，分别是起止时间、项目名称、担任角色、项目描述、负责主要工作描述，其中每个字典内项目描述、负责主要工作描述对应字段的值不要超过100个字符，如果超过请对其进行摘要总结。
    现在，我将会将简历以文字的形式给你提供，具体内容如下:{data}
    """


import requests

url = "https://api.siliconflow.cn/v1/chat/completions"

# model 
# deepseek-ai/DeepSeek-R1-Distill-Llama-8B
# deepseek-ai/DeepSeek-V3
# deepseek-ai/DeepSeek-R1-Distill-Qwen-7B
# deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B
payload = {
    "model": "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
    "messages": [
        {
            "role": "user",
            "content": system_prompt
        }
    ],
    "stream": False,
    "max_tokens": 5120,
    "stop": ["null"],
    "temperature": 0.01,
    "top_p": 0.7,
    "top_k": 20,
    "frequency_penalty": 0.2,
    "n": 1,
    "response_format": {"type": "text"},
    # "tools": [
    #     # {
    #     #     "type": "function",
    #     #     "function": {
    #     #         "description": "<string>",
    #     #         "name": "<string>",
    #     #         "parameters": {},
    #     #         "strict": False
    #     #     }
    #     # }
    # ]
}
headers = {
    "Authorization": "Bearer sk-qdrgothzfapjeiczudfhijfgqobixblwgiqmwgchkzcstwmw",
    "Content-Type": "application/json"
}

import time
start_time =time.time()
response = requests.request("POST", url, json=payload, headers=headers)
end_time = time.time()
print(f'响应时间：{end_time - start_time:.2f}秒')
print(response.text)
response_json = json.loads(response.text)
ai_message_string = response_json['choices'][0]['message']['content'].strip('```json').strip('```')
ai_message_json = json.loads(ai_message_string)

save_path = filepath.replace('.pdf', '.json').replace('.doc', '.json').replace('.docx', '.json')
with open(save_path, 'w', encoding='utf-8') as f:
    json.dump(ai_message_json, f, ensure_ascii=False, indent=4)