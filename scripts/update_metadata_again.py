import os
import json
import random
import pandas as pd

# Load player-videos.csv
player_videos_df = pd.read_csv("/Users/qisforq/Documents/Code/athletifi-code/smart-contracts/collection_metadata/VSASummer23Videos/player-videos.csv")

def modify_metadata(metadata, player_videos_df):
    # Extract player_name from animation_url
    player_name = metadata["animation_url"][2:-4].replace("-", " ")
    
    # Update description
    description_template = """
    # Villanova Soccer Academy (VSA) Summer 2023 Collection 🌟

    A digital sports trading card representing [player_name] from Villanova Soccer Academy. This card provides a dynamic snapshot of Anderson Rodriguez's performance in various categories.

    ## About the Collection 📖

    Introducing the **Villanova Soccer Academy (VSA) Summer 2023 Collection** presented by **AthletiFi**! This is the inaugural Digital Player Card collection from AthletiFi, featuring players from two elite teams of VSA, capturing their dynamism and potential in the realm of soccer. With AI-assisted video recognition technology, each card dynamically updates with the player's latest performance stats, providing an engaging snapshot of their journey.

    ## Why Collect? 🤔

    - 🔍 **Discover & Follow**: Get to know the most promising young talents in soccer.
    - 🎮 **Web3 Gaming**: These aren't just cards; use them to play as the featured players in our upcoming game!
    - 💙 **Support**: Revenue-sharing model supports players, academies, and communities. By collecting, you're directly aiding player development and supporting families.
    - ⚽ **Engagement**: Dive deep into the world of soccer, support the players you believe in, and be a part of their success story.

    ## Target Audience 👨‍👩‍👧‍👦

    Perfect for Soccer fans and community members looking to get more engaged in directly supporting up and coming talent, and anyone who believes in the power of sports to change lives.

    **Join us** in revolutionizing how fans engage with soccer, opening new opportunities for players, and creating a more connected and supportive soccer community!
    """
    
    metadata["description"] = description_template.replace("[player_name]", player_name)
    
    # Update attributes
    for attribute in metadata["attributes"]:
        if attribute["trait_type"] == "Player Number" and isinstance(attribute["value"], int):
            attribute["value"] = str(attribute["value"])
            
    # Add new attributes
    metadata["attributes"].append({"trait_type": "Edition", "value": "3D Gold"})
    metadata["attributes"].append({
        "trait_type": "Speed Boost", 
        "value": random.randint(1, 15),
        "display_type": "boost_number"
    })
    metadata["attributes"].append({
        "trait_type": "Stamina Increase", 
        "value": random.choice(list(range(10, 41, 5))),
        "display_type": "boost_percentage"
    })
    
    # Update animation_url
    new_url = player_videos_df[player_videos_df["player_name"] == player_name]["animation_url"].values
    if new_url:
        metadata["animation_url"] = new_url[0]
    
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
        json.dump(modified_data, file)
