import os
import json
import random
import pandas as pd

base_dir = "/Users/qisforq/Documents/Code/athletifi-code/smart-contracts/collection_metadata/VSASummer23/VSASummer23NFTs"
# Version 1:

# # Load player-videos.csv
# player_videos_df = pd.read_csv("/Users/qisforq/Documents/Code/athletifi-code/smart-contracts/collection_metadata/VSASummer23Videos/player-videos.csv")

# def modify_metadata(metadata, player_videos_df):
#     # Extract player_name from animation_url
#     player_name = metadata["animation_url"][101:-4].replace("-", " ")
    
#     # Update description
#     description_template = """
#     Villanova Soccer Academy (VSA) Summer 2023 Collection 🌟

#     [player_name] from Villanova Soccer Academy. 
#     This card provides a dynamic snapshot of 
#     [player_name]'s performance in various categories.
    
#     Introducing the Villanova Soccer Academy (VSA) Summer 
#     2023 Collection presented by AthletiFi! This is the 
#     inaugural Digital Player Card collection from AthletiFi, 
#     featuring players from two elite teams of VSA, capturing 
#     their dynamism and potential in the realm of soccer. With 
#     AI-assisted video recognition technology, each card 
#     dynamically updates with the player's latest performance 
#     stats, providing an engaging snapshot of their journey.
#     """
    
#     metadata["description"] = description_template.replace("[player_name]", player_name)

#     return metadata

# # Loop through each of the 25 folders

# for folder in os.listdir(base_dir):
#     folder_path = os.path.join(base_dir, folder)

#     # Skip if not a directory or is a .DS_Store file
#     if not os.path.isdir(folder_path) or folder == ".DS_Store":
#         continue

#     metadata_file_path = os.path.join(folder_path, "metadata.json")
    
#     # Read metadata.json
#     with open(metadata_file_path, "r") as file:
#         metadata_data = json.load(file)
    
#     # Modify the metadata
#     modified_data = modify_metadata(metadata_data, player_videos_df)
    
#     # Save the modified data back to metadata.json
#     with open(metadata_file_path, "w") as file:
#         json.dump(modified_data, file, indent=4) 

# Version 2:

def get_player_name_from_url(animation_url):
    """Extract the player name from the animation URL."""
    # Remove the base URL
    player_name = animation_url.replace('https://scarlet-electric-boar-374.mypinata.cloud/ipfs/QmQXwASeT5wsw78ra1wff2Y8AficdA1G4FpcaicLuGVkqM/', '')
    # Remove the '.mp4' extension
    player_name = player_name.replace('.mp4', '')
    # Replace hyphens with spaces
    player_name = player_name.replace('-', ' ')
    return player_name

def process_folders():
    """Loop through each folder and process the metadata.json file."""
    # Load the player descriptions file
    
    descriptions_content = {
    "Anderson Rodriguez": "Anderson Rodriguez from Villanova Soccer Academy. They are an indispensable asset to the 2009s team. With the number 6 on their back, their dedication to the game is palpable.",
    "Andrew Gilmore": "Andrew Gilmore from Villanova Soccer Academy. Recognized as one of the pillars of the 2011s team, with the number 2 on their back, the spirit and values of the sport are manifested in every play.",
    "Christian Rodriguez": "Christian Rodriguez from Villanova Soccer Academy. Recognized as one of the pillars of the 2009s team, sporting the number 30, they consistently play with heart, radiating the true essence of soccer.",
    "Colin Bobrek": "Colin Bobrek from Villanova Soccer Academy. Standing out, they're a core player for the 2011s side. With the number 16 on their back, their dedication to the game is palpable.",
    "Connor Waters": "Connor Waters from Villanova Soccer Academy. Standing out, they're a core player for the 2011s side. Sporting the number 4, they consistently play with heart, radiating the true essence of soccer.",
    "Danny Orova": "Danny Orova from Villanova Soccer Academy. Standing out, they're a core player for the 2009s side. Sporting the number 12, they consistently play with heart, radiating the true essence of soccer.",
    "David Calderon": "David Calderon  from Villanova Soccer Academy. They are an indispensable asset to the 2011s team. Sporting the number 26, their dedication to the game is palpable.",
    "Edgar Castillo": "Edgar Castillo from Villanova Soccer Academy. Recognized as one of the pillars of the 2009s team, identifiable with jersey number 4, the spirit and values of the sport are manifested in every play.",
    "Hunter Ormsbee": "Hunter Ormsbee from Villanova Soccer Academy. Standing out, they're a core player for the 2011s side. Sporting the number 31, they consistently play with heart, radiating the true essence of soccer.",
    "Jose Hernandez": "Jose Hernandez from Villanova Soccer Academy. Standing out, they're a core player for the 2009s side. Identifiable with jersey number 7, the spirit and values of the sport are manifested in every play.",
    "Joseph Valdez": "Joseph Valdez from Villanova Soccer Academy. They've cemented a spot as a remarkable player in the 2011s lineup. Identifiable with jersey number 17, the spirit and values of the sport are manifested in every play.",
    "Jude Ibrahim": "Jude Ibrahim from Villanova Soccer Academy. They've cemented a spot as a remarkable player in the 2009s lineup. With the number 10 on their back, their enthusiasm for soccer is evident every match.",
    "Luke Lavelle": "Luke Lavelle from Villanova Soccer Academy. Standing out, they're a core player for the 2011s side. With the number 24 on their back, they consistently play with heart, radiating the true essence of soccer.",
    "Luke Lohkamp": "Luke Lohkamp  from Villanova Soccer Academy. They are an indispensable asset to the 2011s team. Donning the jersey number 12, they consistently play with heart, radiating the true essence of soccer.",
    "Luke Myers": "Luke Myers  from Villanova Soccer Academy. They've cemented a spot as a remarkable player in the 2011s lineup. Sporting the number 15, their enthusiasm for soccer is evident every match.",
    "Nacho Aliaga": "Nacho Aliaga  from Villanova Soccer Academy. Recognized as one of the pillars of the 2011s team, with the number 13 on their back, their dedication to the game is palpable.",
    "Nash De Meester": "Nash De Meester  from Villanova Soccer Academy. They've cemented a spot as a remarkable player in the 2011s lineup. Identifiable with jersey number 14, they consistently play with heart, radiating the true essence of soccer.",
    "Nicholas Tulio": "Nicholas Tulio  from Villanova Soccer Academy. They are an indispensable asset to the 2011s team. Identifiable with jersey number 19, the spirit and values of the sport are manifested in every play.",
    "Nickollas Nascimento": "Nickollas Nascimento  from Villanova Soccer Academy. They've cemented a spot as a remarkable player in the 2011s lineup. With the number 9 on their back, they consistently play with heart, radiating the true essence of soccer.",
    "Oscar Gasga": "Oscar Gasga from Villanova Soccer Academy. Recognized as one of the pillars of the 2009s team, sporting the number 14, they consistently play with heart, radiating the true essence of soccer.",
    "Petter Keffer": "Petter Keffer from Villanova Soccer Academy. Standing out, they're a core player for the 2011s side. Sporting the number 27, the spirit and values of the sport are manifested in every play.",
    "Ryan Lauria": "Ryan Lauria  from Villanova Soccer Academy. They are an indispensable asset to the 2011s team. Identifiable with jersey number 34, their dedication to the game is palpable.",
    "Salvador Carrillo": "Salvador Carrillo from Villanova Soccer Academy. Standing out, they're a core player for the 2009s side. With the number 22 on their back, they consistently play with heart, radiating the true essence of soccer.",
    "Stebi Vidal": "Stebi Vidal from Villanova Soccer Academy. Recognized as one of the pillars of the 2009s team, identifiable with jersey number 21, they consistently play with heart, radiating the true essence of soccer.",
    "Alesandro Cárdenas": "Alesandro Cárdenas from Villanova Soccer Academy. Standing out, they're a core player for the 2009s side. Donning the jersey number 1, they consistently play with heart, radiating the true essence of soccer.",
    "Anthony Bonilla": "Anthony Bonilla  from Villanova Soccer Academy. Standing out, they're a core player for the 2011s side. Donning the jersey number 18, the spirit and values of the sport are manifested in every play.",
    "Christian Hoey": "Christian Hoey from Villanova Soccer Academy. They've cemented a spot as a remarkable player in the 2009s lineup. Identifiable with jersey number 33, their enthusiasm for soccer is evident every match."
}
        
    for item in os.listdir(base_dir):
        folder_path = os.path.join(base_dir, item)
        
        # Check if the item is a directory and not a file
        if os.path.isdir(folder_path):
            metadata_file_path = os.path.join(folder_path, "metadata.json")
            
            # Check if metadata.json exists in the directory
            if os.path.exists(metadata_file_path):
                with open(metadata_file_path, 'r') as meta_file:
                    metadata = json.load(meta_file)
                
                # Extract player name from animation_url
                player_name = get_player_name_from_url(metadata["animation_url"])
                print(player_name)
                # Update the description in metadata.json if the player name exists in the descriptions_content
                if player_name in descriptions_content:
                    metadata["description"] = descriptions_content[player_name]
                    
                    # Save the modified metadata.json back to the folder
                    with open(metadata_file_path, 'w') as meta_file:
                        json.dump(metadata, meta_file, indent=4)

if __name__ == "__main__":
    process_folders()
    print("Metadata files in all folders have been successfully processed!")
