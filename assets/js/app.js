// Move label on click: from the upper box to the lower box
document.addEventListener('DOMContentLoaded', () => {
	const allLabelsBox = document.getElementById( 'all-labels-box');
	const selectedLabelsBox = document.getElementById('selected-labels-box');
	const selectedLabelsInput = document.getElementById('selectedLabelsInput');
	if (!allLabelsBox || !selectedLabelsBox || !selectedLabelsInput) return;

	function getLabelCards(container) {
		return Array.from(container.querySelectorAll('.label-card'));
	}

	getLabelCards(allLabelsBox).forEach(card => {
		card.addEventListener('click', () => {
			// Check for duplicates
			if (getLabelCards(selectedLabelsBox).some(c => c.textContent === card.textContent)) return;
			// Remove placeholder
			const placeholder = selectedLabelsBox.querySelector('div[style*="color: #bbb"]');
			if (placeholder) selectedLabelsBox.removeChild(placeholder);
			// Move DOM element
			selectedLabelsBox.appendChild(card);
			card.style.background = '#e0ffe0';
			card.style.border = '1px solid #4caf50';
			card.style.cursor = 'default';
			updateSelectedLabelsInput();
		});
	});

	function updateSelectedLabelsInput() {
		const selected = getLabelCards(selectedLabelsBox).map(card => card.textContent);
		selectedLabelsInput.value = selected.join(',');
	}

	const form = selectedLabelsBox.closest('form');
	if (form) {
		form.addEventListener('submit', updateSelectedLabelsInput);
	}
});
// --- Pure drag-and-drop: label stays in the lower box until the form is submitted ---
document.addEventListener('DOMContentLoaded', () => {
	const allLabelsBox = document.getElementById('all-labels-box');
	const selectedLabelsBox = document.getElementById('selected-labels-box');
	const selectedLabelsInput = document.getElementById('selectedLabelsInput');
	if (!allLabelsBox || !selectedLabelsBox || !selectedLabelsInput) return;

	function getLabelCards(container) {
		return Array.from(container.querySelectorAll('.label-card'));
	}

	// Make cards draggable
	getLabelCards(allLabelsBox).forEach(card => {
		card.setAttribute('draggable', 'true');
		card.addEventListener('dragstart', (e) => {
			e.dataTransfer.setData('text/plain', card.textContent);
			e.dataTransfer.effectAllowed = 'move';
			// Save a reference to the dragged card
			window._draggedLabelCard = card;
		});
	});

	selectedLabelsBox.addEventListener('dragover', (e) => {
		e.preventDefault();
		selectedLabelsBox.style.background = '#e6f7ff';
	});

	selectedLabelsBox.addEventListener('dragleave', () => {
		selectedLabelsBox.style.background = '#f6fff6';
	});

	selectedLabelsBox.addEventListener('drop', (e) => {
		e.preventDefault();
		selectedLabelsBox.style.background = '#f6fff6';
		const labelName = e.dataTransfer.getData('text/plain');
		if (!labelName || !window._draggedLabelCard) return;
		// Check for duplicates
		if (getLabelCards(selectedLabelsBox).some(card => card.textContent === labelName)) return;
		// Remove placeholder
		const placeholder = selectedLabelsBox.querySelector('div[style*="color: #bbb"]');
		if (placeholder) selectedLabelsBox.removeChild(placeholder);
		// Move DOM element from the upper box to the lower box
		selectedLabelsBox.appendChild(window._draggedLabelCard);
		window._draggedLabelCard.style.background = '#e0ffe0';
		window._draggedLabelCard.style.border = '1px solid #4caf50';
		window._draggedLabelCard.style.cursor = 'default';
		window._draggedLabelCard = null;
		updateSelectedLabelsInput();
	});

	function updateSelectedLabelsInput() {
		const selected = getLabelCards(selectedLabelsBox).map(card => card.textContent);
		selectedLabelsInput.value = selected.join(',');
	}

	const form = selectedLabelsBox.closest('form');
	if (form) {
		form.addEventListener('submit', updateSelectedLabelsInput);
	}
});
	document.addEventListener('DOMContentLoaded', () => {
		const allLabelsBox = document.getElementById('all-labels-box');
		const selectedLabelsBox = document.getElementById('selected-labels-box');
		const selectedLabelsInput = document.getElementById('selectedLabelsInput');
		if (!allLabelsBox || !selectedLabelsBox || !selectedLabelsInput) return;

		let draggedCard = null;

		function getLabelCards(container) {
			return Array.from(container.querySelectorAll('.label-card'));
		}

		getLabelCards(allLabelsBox).forEach(card => {
			card.setAttribute('draggable', 'true');
			card.addEventListener('dragstart', (e) => {
				draggedCard = card;
				e.dataTransfer.setData('text/plain', card.textContent);
				e.dataTransfer.effectAllowed = 'move';
			});
		});

		selectedLabelsBox.addEventListener('dragover', (e) => {
			e.preventDefault();
			selectedLabelsBox.style.background = '#e6f7ff';
		});

		selectedLabelsBox.addEventListener('dragleave', () => {
			selectedLabelsBox.style.background = '#f6fff6';
		});

		selectedLabelsBox.addEventListener('drop', (e) => {
			e.preventDefault();
			selectedLabelsBox.style.background = '#f6fff6';
			if (!draggedCard) return;
			// Check for duplicates
			if (getLabelCards(selectedLabelsBox).some(card => card.textContent === draggedCard.textContent)) {
				draggedCard = null;
				return;
			}
			// Remove placeholder
			const placeholder = selectedLabelsBox.querySelector('div[style*="color: #bbb"]');
			if (placeholder) selectedLabelsBox.removeChild(placeholder);
			// Move DOM element from the upper box to the lower box
			selectedLabelsBox.appendChild(draggedCard);
			draggedCard.style.background = '#e0ffe0';
			draggedCard.style.border = '1px solid #4caf50';
			draggedCard.style.cursor = 'default';
			draggedCard = null;
			updateSelectedLabelsInput();
		});

		function updateSelectedLabelsInput() {
			const selected = getLabelCards(selectedLabelsBox).map(card => card.textContent);
			selectedLabelsInput.value = selected.join(',');
		}

		const form = selectedLabelsBox.closest('form');
		if (form) {
			form.addEventListener('submit', updateSelectedLabelsInput);
		}
	});

// Drag-and-drop for labels
document.addEventListener('DOMContentLoaded', () => {
	const allLabelsBox = document.getElementById('all-labels-box');
	const selectedLabelsBox = document.getElementById('selected-labels-box');
	const selectedLabelsInput = document.getElementById('selectedLabelsInput');
	if (!allLabelsBox || !selectedLabelsBox || !selectedLabelsInput) return;

	function getLabelCards(container) {
		return Array.from(container.querySelectorAll('.label-card'));
	}

	getLabelCards(allLabelsBox).forEach(card => {
		card.setAttribute('draggable', 'true');
		card.addEventListener('dragstart', (e) => {
			e.dataTransfer.setData('text/plain', card.textContent);
			e.dataTransfer.effectAllowed = 'move';
		});
	});

	selectedLabelsBox.addEventListener('dragover', (e) => {
		e.preventDefault();
		selectedLabelsBox.style.background = '#e6f7ff';
	});

	selectedLabelsBox.addEventListener('dragleave', () => {
		selectedLabelsBox.style.background = '#f6fff6';
	});

	selectedLabelsBox.addEventListener('drop', (e) => {
		e.preventDefault();
		selectedLabelsBox.style.background = '#f6fff6';
		const labelName = e.dataTransfer.getData('text/plain');
		if (!labelName) return;
		if (getLabelCards(selectedLabelsBox).some(card => card.textContent === labelName)) return;
		const placeholder = selectedLabelsBox.querySelector('div[style*="color: #bbb"]');
		if (placeholder) selectedLabelsBox.removeChild(placeholder);
		const allCards = getLabelCards(allLabelsBox);
		const sourceCard = allCards.find(card => card.textContent === labelName);
		if (sourceCard) allLabelsBox.removeChild(sourceCard);
		const card = document.createElement('div');
		card.className = 'label-card';
		card.textContent = labelName;
		card.style.padding = '6px 12px';
		card.style.background = '#e0ffe0';
		card.style.borderRadius = '6px';
		card.style.border = '1px solid #4caf50';
		card.style.cursor = 'default';
		selectedLabelsBox.appendChild(card);
		updateSelectedLabelsInput();
	});

	function updateSelectedLabelsInput() {
		const selected = getLabelCards(selectedLabelsBox).map(card => card.textContent);
		selectedLabelsInput.value = selected.join(',');
	}

	const form = selectedLabelsBox.closest('form');
	if (form) {
		form.addEventListener('submit', updateSelectedLabelsInput);
	}
});

import 'bootstrap';
import '../scss/app.scss';
console.log('App loaded successfully!');
