import json
import os
import sys
import shutil

"""
Usage: python syncLocalizations.py <input.json> <input_json_files_directory>

Splits the input.json by keys and merges the values to the corresponding
json files in the input_json_files_directory

Example:
    input.json:
        {
            "en": {"home": {"key": "value"}},
            "fr": {"home": {"key": "valeur"}},
        }
    input_json_files_directory files are: `en.json` and `fr.json`
    As a result, the script merges the `{"home": {"key": "value"}}` to `en.json`
        and `{"home": {"key": "valeur"}}` to `fr.json`
"""

def deep_merge(dict1, dict2):
    for key, value in dict2.items():
        if key in dict1 and isinstance(dict1[key], dict) and isinstance(value, dict):
            deep_merge(dict1[key], value)
        else:
            dict1[key] = value

def ensure_valid_json_file(file_path):
    if not os.path.exists(file_path):
        with open(file_path, 'w') as new_file:
            new_file.write('{}')

def check_and_add_newline(file_path):
    # Read the content of the file
    with open(file_path, 'r') as file:
        file_contents = file.read()

    # Check if a newline character exists at the end of the file
    if not file_contents.endswith('\n'):
        # Add a newline character at the end
        with open(file_path, 'a') as file:
            file.write('\n')

def update_json_files(new_json_path, json_files_directory):
    # Check if new.json exists
    if not os.path.exists(new_json_path):
        print(f"Error: new.json does not exist at {new_json_path}")
        return

    # Check if the directory exists
    if not os.path.isdir(json_files_directory):
        print(f"Error: Directory does not exist at {json_files_directory}")
        return

    # Load new.json
    with open(new_json_path, 'r') as new_json_file:
        new_data = json.load(new_json_file)

    # Iterate through each JSON file in the directory
    for json_file_name in os.listdir(json_files_directory):
        if json_file_name.endswith('.json'):
            json_file_path = os.path.join(json_files_directory, json_file_name)
            language_code = os.path.splitext(json_file_name)[0]

            # Ensure the JSON file has a valid structure (empty JSON object) if it's empty
            ensure_valid_json_file(json_file_path)

            # Check if the language code exists in new.json
            if language_code in new_data:
                # Load the existing JSON data, even if it's empty
                with open(json_file_path, 'r') as existing_json_file:
                    existing_json_contents = existing_json_file.read()
                    existing_data = json.loads(existing_json_contents) if existing_json_contents.strip() else {}

                # Merge the two JSON objects deeply
                deep_merge(existing_data, new_data[language_code])

                # Write the merged data back to the JSON file with a new line after the last }
                with open(json_file_path, 'w') as updated_json_file:
                    json.dump(existing_data, updated_json_file, indent=2, ensure_ascii=False)
                    updated_json_file.write('\n')  # Add a new line after the JSON data

                # Check and add a newline character at the end of the file
                check_and_add_newline(json_file_path)

                # Rename the JSON file to match the language code
                new_file_path = os.path.join(json_files_directory, language_code + '.json')
                shutil.move(json_file_path, new_file_path)

    print("JSON files updated successfully.")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python syncLocalizations.py <path_to_new.json> <path_to_json_files_directory>")
    else:
        new_json_path = sys.argv[1]
        json_files_directory = sys.argv[2]
        update_json_files(new_json_path, json_files_directory)
