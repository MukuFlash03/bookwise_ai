from fastapi import HTTPException

async def test_kg():
  print("Hi from KG test")
    
  try:
      return {"message": f"Tested successfully"}
  except Exception as e:
      raise HTTPException(status_code=500, detail=f"Error copying file: {str(e)}")


