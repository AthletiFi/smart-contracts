import os
import json

# # Base directory
# base_dir = "./"

# # Loop through each of the 25 folders
# for idx in range(1, 26):
#     folder_path = os.path.join(base_dir, str(idx))
    
#     # Find the .mp4 file in the folder
#     video_file = next(f for f in os.listdir(folder_path) if f.endswith(".mp4"))
    
#     # Extract player name from the video file name
#     player_name = video_file.replace(".mp4", "").replace("-", " ")
    
#     # Load the metadata.json file
#     metadata_file_path = os.path.join(folder_path, "metadata.json")
#     with open(metadata_file_path, "r") as file:
#         metadata = json.load(file)
    
#     # Update the metadata based on the video file name
#     metadata["animation"] = f"./{video_file}"
#     metadata["name"] = f"Villanova Soccer Academy - {player_name}"
#     metadata["description"] = f"A digital sports trading card representing {player_name} from Villanova Soccer Academy. This card provides a dynamic snapshot of {player_name}'s performance in various categories."
#     metadata["edition"] = "3D Gold"
#     metadata["collection"] = "Villanova Soccer Academy - Summer 2023 Collection"
    
#     # Save the updated metadata back to the metadata.json file
#     with open(metadata_file_path, "w") as file:
#         json.dump(metadata, file, indent=4)

# print("Metadata files updated successfully!")


import pandas as pd

def process_metadata(metadata, player_data):
    # Modify the animation value and rename it to animation_url
    player_name = metadata["animation"].replace('./', '').replace('-', ' ').replace('.mp4', '')
    metadata["animation_url"] = metadata.pop("animation")
    
    # Loop through the attributes array to update the values according to the csv data
    player_row = player_data[player_data["Player Name"] == player_name]
    if not player_row.empty:
        for attribute in metadata["attributes"]:
            trait_type = attribute["trait_type"]
            if trait_type in player_row.columns:
                attribute["value"] = int(player_row[trait_type].values[0])
    
    # Add the new objects to the attributes array
    metadata["attributes"].append({"trait_type": "Club", "value": "Villanova Soccer Academy"})
    metadata["attributes"].append({"trait_type": "Team", "value": player_row["Team"].values[0]})
    metadata["attributes"].append({"trait_type": "Player Number", "value": int(player_row["Player Number"].values[0])})
    
    # Update the root domain in external_url
    metadata["external_url"] = metadata["external_url"].replace("athletifi.com", "athleti.fi")
    
    return metadata

# Load the player data
player_data = pd.read_csv('/Users/qisforq/Desktop/player_data.csv')

# Path to the directory containing the 25 folders
directory_path = '/Users/qisforq/Documents/Code/athletifi-code/smart-contracts/collection_metadata/VSASummer23NFTs'

# Loop through each folder in the directory
for folder in os.listdir(directory_path):
    folder_path = os.path.join(directory_path, folder)
    if os.path.isdir(folder_path):
        metadata_file_path = os.path.join(folder_path, 'metadata.json')
        
        # Check if metadata.json exists in the folder
        if os.path.exists(metadata_file_path):
            try:
                # Read the metadata.json from the folder
                with open(metadata_file_path, 'r') as file:
                    metadata = json.load(file)
                
                # Determine whether to use "animation" or "animation_url"
                animation_key = "animation_url" if "animation_url" in metadata else "animation"
                
                # Check if metadata.json has already been processed
                if "animation_url" in metadata:
                    print(f"Skipped folder {folder} (already processed)")
                    continue
                
                # Check for player's presence in CSV before processing metadata
                player_name = metadata[animation_key].replace('./', '').replace('-', ' ').replace('.mp4', '')
                player_row = player_data[player_data["Player Name"] == player_name]
                if player_row.empty:
                    print(f"Skipped folder {folder} (player not found in CSV)")
                    continue
                
                # Process the metadata
                processed_metadata = process_metadata(metadata, player_data)
                
                # Save the modified metadata.json back to the folder
                with open(metadata_file_path, 'w') as file:
                    json.dump(processed_metadata, file, indent=4)
                print(f"Processed folder: {folder}")
                
            except Exception as e:
                print(f"Error processing folder {folder}: {e}")
        else:
            print(f"Skipped folder {folder} (metadata.json not found)")
    else:
        print(f"Skipped {folder} (Not a directory)")

print("Processing complete!")
