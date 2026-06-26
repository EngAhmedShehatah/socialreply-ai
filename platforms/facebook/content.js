const AI_BUTTON_ATTR = 'data-socialreply-ai-button';
const AI_PLATFORM = 'facebook';

const buttonStyles = (button) => {
  button.type = 'button';
  button.textContent = '✨ AI Reply';
  button.style.marginTop = '8px';
  button.style.padding = '8px 12px';
  button.style.border = '1px solid #d1d5db';
  button.style.borderRadius = '999px';
  button.style.background = '#ffffff';
  button.style.color = '#111827';
  button.style.fontSize = '13px';
  button.style.fontWeight = '600';
  button.style.cursor = 'pointer';
  button.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.04)';
};

const getCommentBoxes = () => {
  return Array.from(document.querySelectorAll('div[role="textbox"][aria-label*="comment" i]'));
};

const getPostText = (commentBox) => {
  let node = commentBox.parentElement;
  while (node && node !== document.body) {
    const message = node.querySelector('[data-ad-preview="message"]');
    if (message?.innerText?.trim()) return message.innerText.trim();

    const paragraphs = Array.from(node.querySelectorAll('p')).map((p) => p.innerText.trim()).filter(Boolean);
    if (paragraphs.length) return paragraphs.join('\n');

    node = node.parentElement;
  }
  return document.querySelector('[data-ad-preview="message"]')?.innerText?.trim() || document.body.innerText.trim();
};

const setCommentText = (commentBox, text) => {
  commentBox.focus();
  commentBox.innerText = text;
  commentBox.dispatchEvent(
    new InputEvent('input', {
      bubbles: true,
      composed: true,
      inputType: 'insertText',
      data: text,
    })
  );
};

const injectButton = (commentBox) => {
  if (commentBox.hasAttribute('data-socialreply-ai-bound')) return;
  commentBox.setAttribute('data-socialreply-ai-bound', 'true');

  const button = document.createElement('button');
  button.setAttribute(AI_BUTTON_ATTR, AI_PLATFORM);
  buttonStyles(button);

  button.addEventListener('click', async () => {
    chrome.storage.sync.get('apiKey', async (items) => {
      const apiKey = items.apiKey;
      if (!apiKey) {
        alert('Please set your OpenAI API key in the extension options.');
        return;
      }

      const postText = getPostText(commentBox);
      const originalLabel = button.textContent;
      button.disabled = true;
      button.textContent = 'Generating...';

      try {
        const reply = await generateReply(postText, apiKey);
        setCommentText(commentBox, reply);
      } catch (error) {
        console.error(error);
        alert('Unable to generate a reply right now.');
      } finally {
        button.disabled = false;
        button.textContent = originalLabel;
      }
    });
  });

  const container = commentBox.parentElement || commentBox;
  if (!container.querySelector(`[${AI_BUTTON_ATTR}="${AI_PLATFORM}"]`)) {
    commentBox.insertAdjacentElement('afterend', button);
  }
};

const scan = () => {
  getCommentBoxes().forEach(injectButton);
};

const observer = new MutationObserver(scan);
observer.observe(document.documentElement, { childList: true, subtree: true });
scan();
