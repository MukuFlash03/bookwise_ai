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

--------

Screenshots

Use Case from my own notes <br><br>
![IMG_3605](https://github.com/user-attachments/assets/24d38229-4870-4c66-bb58-991e17d10ac3)

<br><br>

Page Upload <br><br>
<img width="386" alt="Screenshot 2024-10-06 at 7 14 54 PM" src="https://github.com/user-attachments/assets/435ec39d-cbdd-430d-b7fb-3814e4db276d">

<br><br>

Generated Notes <br><br>

<img width="1440" alt="Screenshot 2024-10-06 at 7 15 16 PM" src="https://github.com/user-attachments/assets/878cdf40-6569-4928-bf4e-874d41b0233b">


<br><br>

Knowledge Graph <br><br>

<img width="820" alt="Screenshot 2024-10-06 at 7 12 50 PM" src="https://github.com/user-attachments/assets/f6c69f05-0a48-455c-82e2-00874f23dafc">

<br><br>

Word Cloud <br><br>
![word_cloud](https://github.com/user-attachments/assets/28f8f726-a9c2-4ced-832e-1ba15342c8d2)

<br><br>

----------

### Notes

[Readwise](https://readwise.io/)
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
GenAI / LLMs: Claude 3.5 Sonnet <br>
Mobile: iOS, Swift, SwiftUI, Xcode

---------

### Knowledge Graph
- Used the open source code from this [repository](https://github.com/rahulnyk/knowledge_graph/).
- Currently pre-generated graphs seen since Jupyter Notebook takes time to run and is configured to run locally.

### Word Cloud
- Currently images stored only in local directory and not seen in UI.

---------


### iOS Prototype

<img width="408" alt="Screenshot 2024-10-30 at 10 21 25 PM" src="https://github.com/user-attachments/assets/6bab5eee-855a-4326-a4cc-d76e2ab99350">


<img width="408" alt="Screenshot 2024-10-30 at 10 21 17 PM" src="https://github.com/user-attachments/assets/57f19efe-77ab-4ee6-9918-eb0a50eb0614">

