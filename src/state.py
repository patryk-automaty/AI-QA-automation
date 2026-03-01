from typing import TypedDict, List, Optional


class AgentState(TypedDict):
    targer_url: str
    requirements_doc: Optional[str]
    test_cases: List[str]
    generated_code: Optional[str]
    test_report: Optional[str]
    retry_count: int