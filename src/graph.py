from langgraph.graph import StateGraph, END
from src.state import AgentState
from src.agents.analyst import BusinessAnalyst


def create_workflow():
    """
    Build and implement the LangGraph workflow for out AI QA automation pipeline
    """

    # initialize the graph with out custom state
    workflow = StateGraph(AgentState)

    # setup out agents
    analyst = BusinessAnalyst()

    # add nodes
    workflow.add_node("business analyst", analyst.analyze_requirements)
    
    # define edges
    workflow.set_entry_point("business analyst")
    workflow.add_edge("business analyst",END)

    # return compile workflow
    return workflow.compile()
