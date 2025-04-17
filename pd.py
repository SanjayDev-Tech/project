import tkinter as tk
import time
import random

# Sample sentences
sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Python is a great programming language.",
    "Typing speed tests help improve accuracy."
]

# Function to start the test
def start_test():
    global start_time, sentence
    sentence = random.choice(sentences)
    label_sentence.config(text=sentence)
    entry.delete(0, tk.END)
    start_time = time.time()

# Function to check typing speed
def check_speed():
    end_time = time.time()
    typed_text = entry.get()
    time_taken = round(end_time - start_time, 2)
    words_per_minute = round(len(typed_text.split()) * 60 / time_taken, 2)
    accuracy = round(sum(1 for a, b in zip(typed_text, sentence) if a == b) / len(sentence) * 100, 2)
    
    result_label.config(text=f"Time: {time_taken} sec | WPM: {words_per_minute} | Accuracy: {accuracy}%")

# GUI setup
root = tk.Tk()
root.title("Typing Speed Test")

label_sentence = tk.Label(root, text="Click 'Start' to begin!", font=("Arial", 14))
label_sentence.pack()

entry = tk.Entry(root, font=("Arial", 14))
entry.pack()

start_button = tk.Button(root, text="Start", command=start_test)
start_button.pack()

check_button = tk.Button(root, text="Check Speed", command=check_speed)
check_button.pack()

result_label = tk.Label(root, text="", font=("Arial", 14))
result_label.pack()

root.mainloop()