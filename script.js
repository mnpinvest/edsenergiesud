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
            botMessage.textContent = "Bonjour et bienvenue chez EDS Énergie Sud ! 😊 Je suis là pour vous aider avec votre projet. Pour commencer, pourriez-vous me dire en quelques mots quel est votre projet ?";
            chatStep++;
            break;
        case 1:
            formData.projectDescription = input;
            botMessage.textContent = "Est-ce que votre projet concerne plutôt : ⚡ l'électricité, 🔧 la plomberie, ou 🏠 les deux domaines ?";
            chatStep++;
            break;
        case 3:
            formData.workType = input;
            botMessage.textContent = "Est-ce un bien existant, une nouvelle construction ou une extension ?";
            chatStep++;
            break;
        case 4:
            formData.propertyType = input;
            botMessage.textContent = "Quelle est l'urgence de votre projet ?";
            chatStep++;
            break;
        case 6:
            formData.mainObjective = input;
            botMessage.textContent = "Auriez-vous une idée du budget que vous souhaitez y consacrer ?";
            chatStep++;
            break;
        case 7:
            formData.budget = input;
            botMessage.textContent = "Merci beaucoup pour ces informations ! 😊 Pour que l'un de nos experts puisse vous proposer une offre personnalisée, pourriez-vous me donner votre **nom et prénom** ?";
            chatStep++;
            break;
        case 8:
            [formData.firstName, formData.lastName] = input.split(' ');
            botMessage.textContent = "Quelle est votre **adresse e-mail** ?";
            chatStep++;
            break;
        case 9:
            formData.email = input;
            botMessage.textContent = "Et votre **numéro de téléphone** ?";
            chatStep++;
            break;
        case 10:
            formData.phone = input;
            botMessage.textContent = "Enfin, pourriez-vous me donner votre **adresse postale** ou votre **code postal** ?";
            chatStep++;
            break;
        case 11:
            formData.address = input;
            botMessage.textContent = "Quels sont les meilleurs moments pour vous joindre ?\n- 10h\n- 14h\n- 16h\n- 18h";
            chatStep++;
            break;
        case 13:
            formData.contactPreference = input;
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
    document.getElementById('message').value = formData.projectDescription;
    document.getElementById('project-details').value = formData.details;
    if (formData.timeline && formData.timeline.toLowerCase() === "maintenant") {
        document.getElementById('now').checked = true;
    } else if (formData.timeline && formData.timeline.toLowerCase() === "6 mois") {
        document.getElementById('six-months').checked = true;
        document.getElementById('reason-text').value = formData.reason;
        document.getElementById('reason').style.display = 'block';
    } else if (formData.timeline && formData.timeline.toLowerCase() === "1 an") {
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
    finalMessage.textContent = `Merci beaucoup, ${formData.firstName} ${formData.lastName}! 😊 Nous avons bien reçu toutes les informations nécessaires concernant votre projet. Un de nos experts vous contactera sous 24 heures pour discuter des détails et vous fournir une offre personnalisée.

    Nous sommes impatients de pouvoir vous aider à réaliser votre projet d'électricité ou de plomberie. Si vous avez des questions supplémentaires, n'hésitez pas à nous contacter à tout moment. 

    À très bientôt, l'équipe EDS Énergie Sud.`;
    document.getElementById('chatbox-body').appendChild(finalMessage);
}
