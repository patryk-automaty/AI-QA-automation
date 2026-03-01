import os
from dotenv import load_dotenv
from src.graph import create_workflow

# load env variable
load_dotenv()

def main():
    print("Starting AI QA automation pipeline... \n")

    # init workflow
    app = create_workflow()

    # define initial state
    initial_state = {
        "target_url": "https://automationteststore.com/",
        "requirements_doc": None,
        "test_cases": [],
        "generated_code": None,
        "test_report": None,
        "retry_count": 0
    }

    # execute the workflow
    print("Executing the graph...\n")
    
    # invoke the graph
    final_state = app.invoke(initial_state)

    # print the results
    print("\nExecution Finished. Final State output:\n")
    print("="*50)
    print("GENERATED PRD (Requirements Document):")
    print("="*50)
    print(final_state.get("requirements_doc"))
    print("="*50)

if __name__ == "__main__":
    main()


