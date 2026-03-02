import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from src.state import AgentState

class SDETAgent:
    def __init__(self, model: str="gpt-4o-mini"):
        self.llm = ChatOpenAI(model=model, temperature=0.1)


    def write_playwright_tests(self, state: AgentState) -> dict:
        print("--- SDET AGENT is generating Playwright code ---")

        # pull data from state
        target_url = state.get("targer_url")
        test_case_list = state.get("test_cases")

        # check that test cases exist
        test_cases = test_case_list[0] if test_case_list else "No test cases provided"

        # prepare docs for llm
        messages = [
            HumanMessage(content="""You are a Senior Python SDET. 
                                    Write an automated test script using 'pytest' and 'playwright' (sync API) based on the provided BDD test cases.
                                    IMPORTANT: Return ONLY valid Python code. Do not include markdown formatting like ```python. Do not write any explanations."""),
            SystemMessage(content=f"Target URL: https://automationteststore.com/, \n\n BDD Test Cases:\n {test_cases}")
                                    
                    ]
        
        # call to llm
        response = self.llm.invoke(messages)

        # clean up response
        raw_code = response.content
        clean_code = raw_code.replace("```python", "").replace("```", "").strip()

        # update the state
        return {"generated_code": clean_code}
