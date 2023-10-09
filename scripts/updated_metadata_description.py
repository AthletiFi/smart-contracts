import os
import json
import random
import pandas as pd

# Load player-videos.csv
player_videos_df = pd.read_csv("/Users/qisforq/Documents/Code/athletifi-code/smart-contracts/collection_metadata/VSASummer23Videos/player-videos.csv")

def modify_metadata(metadata, player_videos_df):
    # Extract player_name from animation_url
    player_name = metadata["animation_url"][101:-4].replace("-", " ")
    
    # Update description
    description_template = """
    Villanova Soccer Academy (VSA) Summer 2023 Collection 🌟

    [player_name] from Villanova Soccer Academy. 
    This card provides a dynamic snapshot of 
    [player_name]'s performance in various categories.
    
    Introducing the Villanova Soccer Academy (VSA) Summer 
    2023 Collection presented by AthletiFi! This is the 
    inaugural Digital Player Card collection from AthletiFi, 
    featuring players from two elite teams of VSA, capturing 
    their dynamism and potential in the realm of soccer. With 
    AI-assisted video recognition technology, each card 
    dynamically updates with the player's latest performance 
    stats, providing an engaging snapshot of their journey.
    """
    
    metadata["description"] = description_template.replace("[player_name]", player_name)

    return metadata

# Loop through each of the 25 folders
base_dir = "/Users/qisforq/Documents/Code/athletifi-code/smart-contracts/collection_metadata/VSASummer23NFTs"

for folder in os.listdir(base_dir):
    folder_path = os.path.join(base_dir, folder)

    # Skip if not a directory or is a .DS_Store file
    if not os.path.isdir(folder_path) or folder == ".DS_Store":
        continue

    metadata_file_path = os.path.join(folder_path, "metadata.json")
    
    # Read metadata.json
    with open(metadata_file_path, "r") as file:
        metadata_data = json.load(file)
    
    # Modify the metadata
    modified_data = modify_metadata(metadata_data, player_videos_df)
    
    # Save the modified data back to metadata.json
    with open(metadata_file_path, "w") as file:
        json.dump(modified_data, file, indent=4) 

