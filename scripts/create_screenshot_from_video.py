import os
from moviepy.editor import VideoFileClip

def extract_first_frame_from_videos(directory, output_folder):
    """Extract the first frame from each video in the directory and save as PNG using moviepy."""
    
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(directory):
        if filename.endswith(".mp4"):
            video_path = os.path.join(directory, filename)
            clip = VideoFileClip(video_path)
            output_image_path = os.path.join(output_folder, filename.replace(".mp4", ".png"))
            clip.save_frame(output_image_path, t=0)  # Save the first frame
            print(f"Saved first frame of {filename} to {output_image_path}")

if __name__ == "__main__":
    directory = input("Enter the directory path with mp4 files: ")
    output_folder = input("Enter the directory path for output PNG images: ")
    if os.path.exists(directory):
        extract_first_frame_from_videos(directory, output_folder)
        print("Finished extracting first frames.")
    else:
        print("Directory does not exist.")
