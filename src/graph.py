from langgraph.graph import StateGraph, END
from src.state import AgentState
from src.agents.analyst import BusinessAnalyst
from src.agents.designer import TestDesigner
from src.agents.reviewer import QAReviewer



def create_workflow():
    """
    Build and implement the LangGraph workflow for out AI QA automation pipeline
    """

    # initialize the graph with out custom state
    workflow = StateGraph(AgentState)

    # setup agents
    analyst = BusinessAnalyst()
    qa_test_designer = TestDesigner()
    qa_reviewer = QAReviewer()



    # add nodes
    workflow.add_node("business_analyst", analyst.analyze_requirements)
    workflow.add_node("qa_test_designer", qa_test_designer.create_test_cases)
    workflow.add_node("qa_reviewer", qa_reviewer.review_test_cases)

    # define edges
    # start analyst
    workflow.set_entry_point("business_analyst")

    # analyst provides requirements to test designer
    workflow.add_edge("business_analyst", "qa_test_designer")

    # qa test designer provides test cases to reivew
    workflow.add_edge("qa_test_designer", "qa_reviewer")

    # qa reviewer return updated test cases
    workflow.add_edge("qa_reviewer", END)

    # return compile workflow
    return workflow.compile()