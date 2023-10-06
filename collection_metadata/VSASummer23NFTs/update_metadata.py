import os
import json

# Base directory
base_dir = "./"

# Loop through each of the 25 folders
for idx in range(1, 26):
    folder_path = os.path.join(base_dir, str(idx))
    
    # Find the .mp4 file in the folder
    video_file = next(f for f in os.listdir(folder_path) if f.endswith(".mp4"))
    
    # Extract player name from the video file name
    player_name = video_file.replace(".mp4", "").replace("-", " ")
    
    # Load the metadata.json file
    metadata_file_path = os.path.join(folder_path, "metadata.json")
    with open(metadata_file_path, "r") as file:
        metadata = json.load(file)
    
    # Update the metadata based on the video file name
    metadata["animation"] = f"./{video_file}"
    metadata["name"] = f"Villanova Soccer Academy - {player_name}"
    metadata["description"] = f"A digital sports trading card representing {player_name} from Villanova Soccer Academy. This card provides a dynamic snapshot of {player_name}'s performance in various categories."
    metadata["edition"] = "3D Gold"
    metadata["collection"] = "Villanova Soccer Academy - Summer 2023 Collection"
    
    # Save the updated metadata back to the metadata.json file
    with open(metadata_file_path, "w") as file:
        json.dump(metadata, file, indent=4)

print("Metadata files updated successfully!")
