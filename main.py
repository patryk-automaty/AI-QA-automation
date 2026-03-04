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

    print("\n" + "="*50)
    print("GENERATED TEST CASES (BDD Format):")
    print("="*50)

    test_cases_list = final_state.get("test_cases")

    if test_cases_list:
        final_test_plan = test_cases_list[0]

        # create docs folder if not exist
        docs_folder = "docs"
        
        if not os.path.exists(docs_folder):
            os.makedirs(docs_folder, exist_ok=True)
        
        # save test cases to markdown file
        file_path = f"{docs_folder}/TEST_PLAN.md"
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"Auto-Generated test plan for: {initial_state['target_url']}\n\n")
            f.write(final_test_plan)
        
        print("\n" + "="*50)
        print(f" FINAL TEST PLAN SAVED SUCCESSFULLY TO: {file_path}")
        print("="*50)

    else:
        print("\n" + "="*50)
        print(" WARNING: No test cases were generated.")
        print("="*50)

if __name__ == "__main__":
    main()