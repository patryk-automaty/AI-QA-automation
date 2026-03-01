from langgraph.graph import StateGraph, END
from src.state import AgentState
from src.agents.analyst import BusinessAnalyst
from src.agents.designer import TestDesigner


def create_workflow():
    """
    Build and implement the LangGraph workflow for out AI QA automation pipeline
    """

    # initialize the graph with out custom state
    workflow = StateGraph(AgentState)

    # setup out agents
    analyst = BusinessAnalyst()
    qa_test_designer = TestDesigner()

    # add nodes
    workflow.add_node("business_analyst", analyst.analyze_requirements)
    workflow.add_node("qa_test_designer", qa_test_designer.create_test_cases)
    
    # define edges
    # start analyst
    workflow.set_entry_point("business_analyst")

    #analyst provides requirements to test designer
    workflow.add_edge("business_analyst", "qa_test_designer")

    # test designer creates test cases and finishes process
    workflow.add_edge("qa_test_designer", END)

    # return compile workflow
    return workflow.compile()