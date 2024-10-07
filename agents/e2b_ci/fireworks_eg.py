import openai
import json
import sys
import os
from dotenv import load_dotenv

load_dotenv()

FIREWORKS_API_KEY = os.getenv("FIREWORKS_API_KEY")
E2B_API_KEY = os.getenv("E2B_API_KEY")

SYSTEM_PROMPT = """
## your job & context
you are a python data scientist. you are given tasks to complete and you run python code to solve them.
You DO NOT MAKE SYNTAX MISTAKES OR FORGET ANY IMPORTS
- the python code runs in jupyter notebook.
- every time you call `execute_python` tool, the python code is executed in a separate cell. it's okay to multiple calls to `execute_python`.
- display visualizations using matplotlib or any other visualization library directly in the notebook. don't worry about saving the visualizations to a file.
- you have access to the internet and can make api requests.
- you also have access to the filesystem and can read/write files.
- you can install any pip package (if it exists) if you need to but the usual packages for data analysis are already preinstalled.
- you can run any python code you want, everything is running in a secure sandbox environment.
"""

# USER_PROMPT = """
# Plot the concepts in the text after summarizing them so it is easy to understand and visualize. 
# Use these notes: {NOTES}
# """

client = openai.OpenAI(
    base_url = "https://api.fireworks.ai/inference/v1",
    api_key = FIREWORKS_API_KEY
)

tools = [
    {
        "type": "function",
        "function": {
            "name": "execute_python",
            "description": "Execute python code in a Jupyter notebook cell and returns any result, stdout, stderr, display_data, and error.",
            "parameters": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "string",
                        "description": "The python code to execute in a single cell.",
                    },
                },
                "required": ["code"],
            },
        },
        },
]

def code_interpret(e2b_code_interpreter, code):
  print("Running code interpreter...")
  exec = e2b_code_interpreter.notebook.exec_cell(
    code,
    # Stream stdout and stderr from the Code Interpreter
    on_stdout=lambda stdout: print("[Code Interpreter]", stdout),
    on_stderr=lambda stderr: print("[Code Interpreter]", stderr),
    # You can also stream code execution results
    # on_result=...
  )

  if exec.error:
    print("[Code Interpreter ERROR]", exec.error)
  else:
    return exec
  
def chat(e2b_code_interpreter, user_message):
  print(f"\n{'='*50}\nUser Message: {user_message}\n{'='*50}")
  
  messages = [
    {"role": "system", "content": SYSTEM_PROMPT},
    {"role": "user", "content": user_message}
  ]

  response = client.chat.completions.create(
    model = "accounts/fireworks/models/firefunction-v2",
    messages=messages,
    tools=tools,
    tool_choice="auto"
  )
  for choice in response.choices:
    if choice.message.tool_calls and len(choice.message.tool_calls) > 0:
      for tool_call in choice.message.tool_calls:
        if tool_call.function.name == "execute_python":
          if "code" in tool_call.function.arguments:
            args = json.loads(tool_call.function.arguments)
            code = args["code"]          
            print("CODE TO RUN")
            print(code)
            execution_output = code_interpret(e2b_code_interpreter, code)
            return execution_output
    else:
      print("Answer:", choice.message.content)
