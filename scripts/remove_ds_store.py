import os

def delete_ds_store_files(directory):
    """Recursively delete .DS_Store files in the specified directory."""
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file == ".DS_Store":
                file_path = os.path.join(root, file)
                try:
                    os.remove(file_path)
                    print(f"Deleted: {file_path}")
                except Exception as e:
                    print(f"Error deleting {file_path}: {e}")

if __name__ == "__main__":
    directory = input("Enter the directory path: ")
    if os.path.exists(directory):
        delete_ds_store_files(directory)
        print("Finished deleting .DS_Store files.")
    else:
        print("Directory does not exist.")
