document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.chatbox-footer button').addEventListener('click', sendMessage);
    document.getElementById('contact-form').style.display = 'none'; // Hide the form initially
});

let chatStep = 0;
const formData = {};

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = userInput;
        document.getElementById('chatbox-body').appendChild(userMessage);
        
        document.getElementById('user-input').value = ''; // Clear input field
        
        handleChatStep(userInput);
        
        // Scroll to the bottom of the chatbox
        document.getElementById('chatbox-body').scrollTop = document.getElementById('chatbox-body').scrollHeight;
    }
}

function handleChatStep(input) {
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    
    switch (chatStep) {
        case 0:
            botMessage.textContent = "Quel est votre projet par rapport à notre expertise ? Est-ce la remise aux normes d'électricité, changement de tableau électrique, changement de prise, etc. ?";
            chatStep++;
            break;
        case 1:
            formData.projectType = input;
            if (input.toLowerCase().includes("prise")) {
                botMessage.textContent = "Combien de prises souhaitez-vous changer ?";
            } else if (input.toLowerCase().includes("luminaire")) {
                botMessage.textContent = "Combien de luminaires souhaitez-vous changer ? Sont-ils extérieurs ou intérieurs ?";
            } else if (input.toLowerCase().includes("plomberie")) {
                botMessage.textContent = "Pour quelle pièce est-ce ? Salle de bain, WC, cuisine, cellier ?";
            } else {
                botMessage.textContent = "Pouvez-vous donner plus de détails sur votre projet ?";
                chatStep++;
            }
            chatStep++;
            break;
        case 2:
            formData.quantity = input;
            botMessage.textContent = "Pouvez-vous donner plus de détails sur votre projet ?";
            chatStep++;
            break;
        case 3:
            formData.details = input;
            botMessage.textContent = "Depuis combien de temps pensez-vous à réaliser ce projet ?";
            chatStep++;
            break;
        case 4:
            formData.thinkingTime = input;
            botMessage.textContent = "Pourquoi souhaitez-vous réaliser ce projet ?";
            chatStep++;
            break;
        case 5:
            formData.motivation = input;
            botMessage.textContent = "Dans combien de temps envisagez-vous de réaliser ce projet ?";
            chatStep++;
            break;
        case 6:
            formData.timeline = input;
            if (input.toLowerCase() === "6 mois" || input.toLowerCase() === "1 an") {
                botMessage.textContent = `Pourquoi dans ${input} ?`;
            } else {
                botMessage.textContent = "Quel est votre prénom et nom ?";
                chatStep++;
            }
            chatStep++;
            break;
        case 7:
            formData.reason = input;
            botMessage.textContent = "Quel est votre prénom et nom ?";
            chatStep++;
            break;
        case 8:
            [formData.firstName, formData.lastName] = input.split(' ');
            botMessage.textContent = "Quelle est votre adresse et ville ?";
            chatStep++;
            break;
        case 9:
            formData.address = input;
            botMessage.textContent = "Quel est votre numéro de téléphone ?";
            chatStep++;
            break;
        case 10:
            formData.phone = input;
            finalizeFormData();
            return;
        default:
            botMessage.textContent = "Je suis désolé, je ne comprends pas cette question. Pouvez-vous reformuler ?";
    }
    document.getElementById('chatbox-body').appendChild(botMessage);
}

function finalizeFormData() {
    document.getElementById('name').value = formData.lastName;
    document.getElementById('prenom').value = formData.firstName;
    document.getElementById('email').value = formData.email;
    document.getElementById('phone').value = formData.phone;
    document.getElementById('subject').value = formData.projectType;
    document.getElementById('message').value = formData.project;
    document.getElementById('project-details').value = formData.details;
    if (formData.timeline.toLowerCase() === "maintenant") {
        document.getElementById('now').checked = true;
    } else if (formData.timeline.toLowerCase() === "6 mois") {
        document.getElementById('six-months').checked = true;
        document.getElementById('reason-text').value = formData.reason;
        document.getElementById('reason').style.display = 'block';
    } else if (formData.timeline.toLowerCase() === "1 an") {
        document.getElementById('one-year').checked = true;
        document.getElementById('reason-text').value = formData.reason;
        document.getElementById('reason').style.display = 'block';
    }

    // Afficher le formulaire une fois rempli
    document.getElementById('contact-form').style.display = 'block';
    document.querySelector('.chatbox').style.display = 'none'; // Hide chatbox once form is displayed

    // Terminer par un message de remerciement
    const finalMessage = document.createElement('div');
    finalMessage.className = 'message bot-message';
    finalMessage.textContent = `Merci ${formData.firstName} ${formData.lastName}! Un installateur va traiter votre demande dans les 24h. A très bientôt, EDS Énergie Sud.`;
    document.getElementById('chatbox-body').appendChild(finalMessage);
}
