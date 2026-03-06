from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from src.state import AgentState

class BusinessAnalyst:

    def __init__(self, model: str = "gpt-4o-mini"):
        self.llm = ChatOpenAI(model=model, temperature=0.1)
    
    def analyze_requirements(self, state: AgentState) -> dict:
        print("--- BUSINESS ANALYST AGENT is working ---")

        # get url adress from state
        url = state.get("targer_url")

        # prepare blueprint for agent
        messages = [
            SystemMessage(content="You are a accurate Business Analyst and QA expert. Your output must be clearly and readable professional Markdown."),
            HumanMessage(content=f"""Create a brief Product Requirements Document for this website: https://www.automationexercise.com/,
                         Focus on core functionalities that a QA would need to test (e.g login, navigation, search, cart, and so on).
                         Keep it consise
                         """)
        ]

        # send message to llm
        response = self.llm.invoke(messages)

        # return requirements to our state
        return {"requirements_doc": response.content}
        
