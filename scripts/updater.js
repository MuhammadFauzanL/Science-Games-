"use strict";

{
    const broadcastChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("offline") : null;

    if (broadcastChannel)
    {
        broadcastChannel.addEventListener("message", (event) =>
        {
            const data = event.data;
            const type = data.type;

            if (type === "update-ready")
            {
                showUpdateNotification();
            }
        });
    }

    function showUpdateNotification()
    {
        const toast = document.createElement("div");
        toast.id = "update-toast";
        toast.innerHTML = `
            <div class="update-toast-content">
                <p>Versi baru tersedia!</p>
                <button id="update-reload-btn">Update Sekarang</button>
            </div>
        `;
        document.body.appendChild(toast);

        const style = document.createElement("style");
        style.textContent = `
            #update-toast {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.85);
                color: white;
                padding: 15px 25px;
                border-radius: 50px;
                z-index: 10000;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                backdrop-filter: blur(5px);
                animation: slideUp 0.5s ease-out;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .update-toast-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .update-toast-content p {
                margin: 0;
                font-size: 14px;
            }
            #update-reload-btn {
                background: #4CAF50;
                border: none;
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                cursor: pointer;
                font-weight: bold;
                transition: background 0.3s;
            }
            #update-reload-btn:hover {
                background: #45a049;
            }
            @keyframes slideUp {
                from { bottom: -100px; opacity: 0; }
                to { bottom: 20px; opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.getElementById("update-reload-btn").addEventListener("click", () => {
            location.reload();
        });
    }
}
