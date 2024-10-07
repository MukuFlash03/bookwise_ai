# BookWise AI
Your go-to Second Brain for book readers.

The process is divided into two steps:
- Capture: Digitize notes, annotations, markings, highlights from physical books / e-books.
- Organize: Visualize the information in formats like Knowledge Graphs, Word Clouds.

## Long-term vision
1. Support more documents
- This includes document types like legal, financial, educational notes.
- Also support handwritten notes, whiteboard illustrations.

2. Smart Glasses and Smart Phones
- Have a working smart phone app.
- Integration with Smart Glasses so users can directly take pictures with glasses.

----------

### Notes

[Readwise]([url](https://readwise.io/))
- Found a similar product while building this. <br>
- But this doesn't automatically fetch handwritten notes, markings from physical books.


-------

## User Flow
- Create a book.
- Upload images of pages from books.
- Generate notes.
- Visualize notes.

-------

## Tech Stack
Core: React, TypeScript, NextJS, Python, FastAPI, Supabase <br>
GenAI: E2B CodeInterpreter, Fireworks AI <br>
LLMs: Claude 3.5 Sonnet <br>

---------

### Knowledge Graph
- Used the open source code from this [repository]([url](https://github.com/rahulnyk/knowledge_graph/)).
- Currently pre-generated graphs seen since Jupyter Notebook takes time to run and is configured to run locally.

### Word Cloud
- Currently images stored only in local directory and not seen in UI.

---------



