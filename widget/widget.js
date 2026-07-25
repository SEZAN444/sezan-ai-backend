(() => {

    // ==========================
    // Create Floating Button
    // ==========================

    const button = document.createElement("button");
    button.innerHTML = "💬";
    button.id = "chat-toggle";

    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.width = "60px";
    button.style.height = "60px";
    button.style.border = "none";
    button.style.borderRadius = "50%";
    button.style.background = "#2563eb";
    button.style.color = "#fff";
    button.style.fontSize = "24px";
    button.style.cursor = "pointer";
    button.style.zIndex = "999999";


    // ==========================
    // Chat Window
    // ==========================

    const chat = document.createElement("div");
    chat.id = "chat-window";

    chat.style.position = "fixed";
    chat.style.bottom = "90px";
    chat.style.right = "20px";
    chat.style.width = "350px";
    chat.style.height = "500px";
    chat.style.background = "#ffffff";
    chat.style.borderRadius = "12px";
    chat.style.boxShadow = "0 0 20px rgba(0,0,0,.2)";
    chat.style.display = "none";
    chat.style.flexDirection = "column";
    chat.style.overflow = "hidden";
    chat.style.zIndex = "999999";


    chat.innerHTML = `
        <div style="
            background:#2563eb;
            color:white;
            padding:15px;
            font-weight:bold;">
            Sezan AI Assistant
        </div>

        <div id="messages"
             style="
                flex:1;
                padding:15px;
                overflow-y:auto;
                background:white;
                color:black;
                font-family:Arial, sans-serif;
                font-size:14px;">
        </div>

        <div style="
            display:flex;
            border-top:1px solid #ddd;">

            <input
                id="chat-input"
                type="text"
                placeholder="Type a message..."
                style="
                    flex:1;
                    padding:12px;
                    border:none;
                    outline:none;
                ">

            <button
                id="send-btn"
                style="
                    width:80px;
                    border:none;
                    background:#2563eb;
                    color:white;
                    cursor:pointer;">
                Send
            </button>

        </div>
    `;


    document.body.appendChild(button);
    document.body.appendChild(chat);


    // ==========================
    // Toggle
    // ==========================

    button.onclick = () => {

        if (chat.style.display === "none") {
            chat.style.display = "flex";
        } else {
            chat.style.display = "none";
        }

    };


    // ==========================
    // Send Message
    // ==========================

    async function sendMessage() {

        const input = document.getElementById("chat-input");
        const messages = document.getElementById("messages");

        const text = input.value.trim();

        if (!text) return;

        messages.innerHTML += `
            <p><strong>You:</strong> ${text}</p>
        `;

        input.value = "";


        try {

            const response = await fetch("https://sezan-ai-backend.onrender.com/api/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: text
                })

            });

            const data = await response.json();

            messages.innerHTML += `
                <p><strong>AI:</strong> ${data.reply}</p>
            `;

            messages.scrollTop = messages.scrollHeight;

        }

        catch (err) {

            messages.innerHTML += `
                <p style="color:red;">
                    Failed to connect.
                </p>
            `;

        }

    }


    document.addEventListener("click", (e) => {

        if (e.target.id === "send-btn") {
            sendMessage();
        }

    });


    document.addEventListener("keypress", (e) => {

        if (e.key === "Enter") {
            sendMessage();
        }

    });

})();