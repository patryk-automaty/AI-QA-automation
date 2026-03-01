from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from src.state import AgentState

class TestDesigner:

    def __init__(self, model: str="gpt-4o-mini"):
        self.llm = ChatOpenAI(model=model, temperature=0.3)

    def create_test_cases(self, state: AgentState) -> dict:
        print("--- QA TEST DESIGNER AGENT is working ---")

        # get requirements from businnes analyst
        requirements = state.get("requirements_doc")

        # prepare blueprint for qa test designer
        messages = [
            SystemMessage(content="You are a Senior QA Test Designer.Write test cases in BDD format (Given-When-Then)."),
            HumanMessage(content=f"""Bussiness analyst provide a set of requirements in {requirements}.
                         Your goal is to act as a 'Quality Gate.' Do not just summarize; find the holes in the logic and provide a production-ready test suite.
                         """)
        ]

        # send message to llm
        response = self.llm.invoke(messages)

        # return response to workflow
        return {"test_cases" : [response.content]}