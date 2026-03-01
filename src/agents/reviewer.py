from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from src.state import AgentState

class QAReviewer:

    def __init__(self, model: str="gpt-4o-mini"):
        # temperature 0.2 - strict reviewer, not creative writer
        self.llm = ChatOpenAI(model=model, temperature=0.2)

    def review_test_cases(self, state: AgentState) -> dict:
        print("--- QA TEST CASE REVIEWER is working ---")

        # get requirements from the state
        requirements = state.get("requirements_doc")

        # get test cases from the state
        test_cases_list = state.get("test_cases",[])
        current_test_cases = test_cases_list[0] if test_cases_list else "no test cases provided."

        # prepare blueprint for qa test case reviewer
        messages = [
            SystemMessage(content="""You are a meticulous QA Test Case Reviewer. 
                          Your task is to critically evaluate the provided test cases for completeness, clarity, and effectiveness in covering potential edge cases. 
                          Identify any gaps or weaknesses in the test suite and suggest improvements to ensure robust testing.Always use BDD format."""),
            HumanMessage(content=f"""Compare the following Test Cases against the Original Requirements - {requirements}
                         Here are the test cases in BDD format: {current_test_cases}.
                         Task:
                            1. Check if all requirements are covered.
                            2. Identify and add missing edge cases or negative paths.
                            3. Output the FINAL, polished test suite. Do not write anything else.
                         """)
        ]

        # sent prompt to llm
        response = self.llm.invoke(messages)

        # return response to workflow
        return {"test_cases" : [response.content]}