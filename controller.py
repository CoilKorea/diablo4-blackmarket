import tkinter as tk
import subprocess
import os
import signal
import psutil

def start_server():
    global server_process
    server_process = subprocess.Popen(["node", "server.js"], creationflags=subprocess.CREATE_NEW_CONSOLE)
    status_label.config(text="서버 실행 중...", fg="green")

def stop_server():
    for proc in psutil.process_iter():
        if proc.name() == "node.exe":
            proc.kill()
    status_label.config(text="서버 종료됨", fg="red")

app = tk.Tk()
app.title("Diablo4 서버 컨트롤러")
app.geometry("300x200")
app.resizable(False, False)

tk.Button(app, text="🔵 서버 시작", command=start_server, width=20, height=2).pack(pady=10)
tk.Button(app, text="🔴 서버 종료", command=stop_server, width=20, height=2).pack(pady=10)
status_label = tk.Label(app, text="서버 상태: 대기 중", fg="gray")
status_label.pack(pady=5)

app.mainloop()
