import os
import json
import pandas as pd

def process_metadata_in_folder(folder_path, csv_content):
    """
    Process the metadata.json in the provided folder path based on the given CSV content.
    """
    metadata_path = os.path.join(folder_path, "metadata.json")
    
    # Ensure metadata.json exists
    if not os.path.exists(metadata_path):
        return

    # Load the content of metadata.json
    with open(metadata_path, "r") as json_file:
        metadata = json.load(json_file)

    # Extract and process the player_name
    animation_url = metadata.get("animation_url", "")
    player_name = animation_url.replace("https://scarlet-electric-boar-374.mypinata.cloud/ipfs/QmQXwASeT5wsw78ra1wff2Y8AficdA1G4FpcaicLuGVkqM/", "").replace("-", " ").replace(".mp4", "")

    # Find the corresponding image URL from the CSV
    image_url = csv_content[csv_content["player_name"] == player_name]["image"].values
    if len(image_url) > 0:
        metadata["image"] = image_url[0]

        # Write the updated metadata back to metadata.json, ensuring non-ASCII characters are preserved
        with open(metadata_path, "w") as json_file:
            json.dump(metadata, json_file, indent=4, ensure_ascii=False)

def process_all_folders(base_directory, csv_path):
    """
    Loop through all folders in the base_directory and process their metadata.json files.
    """
    csv_content = pd.read_csv(csv_path)
    
    for item in os.listdir(base_directory):
        item_path = os.path.join(base_directory, item)
        
        # Ensure the current item is a directory and not a file (like .DS_Store)
        if os.path.isdir(item_path):
            process_metadata_in_folder(item_path, csv_content)

# Paths
base_directory = "/Users/qisforq/Documents/Code/athletifi-code/smart-contracts/collection_metadata/VSASummer23/VSASummer23NFTs"
csv_path = "/Users/qisforq/Documents/Code/athletifi-code/smart-contracts/collection_metadata/VSASummer23/player-videos-images-urls.csv"

# Run the processing
process_all_folders(base_directory, csv_path)
