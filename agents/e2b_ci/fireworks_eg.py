import openai
import json
import sys
import os
from dotenv import load_dotenv
load_dotenv()
# from b1_notes import NOTES


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

USER_PROMPT = """
Plot the concepts in the text after summarizing them so it is easy to understand and visualize. Use these notes: 

Book Title: Atomic Habits
Book Author: James Clear

---------

96

Note Title
Introduction to Habit Formation

Page Content Summary
The author relied on small habits to overcome injury and achieve success in various areas of life.
The book offers a step-by-step plan for building better habits for a lifetime.
It's a practical guide, not academic research, focusing on the science of habit creation and change.
The book draws from biology, neuroscience, philosophy, and psychology.
It presents a synthesis of established ideas and recent scientific discoveries.
The core of the book is a four-step model of habits: cue, craving, response, and reward.
The book also covers four laws of behavior change derived from these steps.
The author's model builds upon B.F. Skinner's operant conditioning and Charles Duhigg's work on habit formation.

User Notes Summary
Small habits helped the author fulfill his potential in various aspects of life.
The book aims to provide a step-by-step plan for building better habits for a lifetime.
The author's contribution is to find ideas that matter most and connect them in an actionable way.
The backbone of the book is a four-step model of habits: cue, craving, response, and reward.
The book also covers four laws of behavior change.
The model is influenced by B.F. Skinner's 'stimulus, response, reward' and Charles Duhigg's 'cue, routine, reward' concepts.

Comparison Analysis
The user's notes closely align with the main points of the page content, focusing on the core concepts of habit formation and the book's structure. The reader has highlighted key elements such as the importance of small habits, the four-step model, and the historical context of habit research. However, the notes miss some details about the book's interdisciplinary approach and its practical, non-academic nature. Overall, the user has effectively captured the essential ideas presented on this page.

Match Percentage
85

-------------

99

Note Title
The Two-Minute Rule and Habit Formation

Page Content Summary
Start with showing up consistently before focusing on perfecting habits
The first two minutes of a routine become a ritual, making it easier to start
Ritualizing the beginning of a process increases likelihood of deep focus
Consistent rituals help in entering states of peak performance
The Two-Minute Rule can seem like a trick but is effective for starting habits
If the Two-Minute Rule feels forced, strictly limit activity to two minutes

User Notes Summary
The ideal way to master a difficult skill is through ritualization
Ritualize the beginning of a process to slip into a state of deep focus
Make the first action mindless; make it easy to start and the rest will follow
If the Two-Minute Rule feels forced, do it for two minutes and then stop
The Two-Minute Rule is not just for starting, it's the whole habit (120 seconds)

Comparison Analysis
The user's notes focus heavily on the concept of ritualization and the Two-Minute Rule, which align well with the key points of the page. The reader seems particularly interested in the practical application of making habits easier to start and maintain. However, the notes miss some context about consistency and standardization before optimization. The highlighted portions suggest a keen interest in actionable strategies for habit formation, especially those that make starting easier.

Match Percentage
85

-------------

"""

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
