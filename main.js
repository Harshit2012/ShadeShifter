const components = {
    button: '<button class="btn" id="preview-button">Button</button>',
    input: '<input type="text" class="form-control" id="preview-input" placeholder="Input field">',
    card: '<div class="card" id="preview-card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div>',
    alert: '<div class="alert alert-primary" id="preview-alert" role="alert">This is a primary alert—check it out!</div>',
    heading: '<h1 id="preview-heading">Heading</h1>',
    paragraph: '<p id="preview-paragraph">This is a paragraph.</p>',
    table: '<table id="preview-table"><thead><tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr></thead><tbody><tr><td>Data 1</td><td>Data 2</td><td>Data 3</td></tr></tbody></table>',
    navbar: '<nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="preview-navbar"><a class="navbar-brand" href="#">Navbar</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarNavAltMarkup"><div class="navbar-nav"><a class="nav-link active" href="#">Home</a><a class="nav-link" href="#">Features</a><a class="nav-link" href="#">Pricing</a><a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a></div></div></nav>',
    anchor: '<a href="#" id="preview-anchor">This is a link</a>',
    image: '<img src="https://via.placeholder.com/150" id="preview-image" alt="Placeholder Image">',
    ul: '<ul id="preview-ul"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
    li: '<ul><li id="preview-li">List Item</li></ul>',
    div: '<div id="preview-div">This is a div</div>'
};

const controls = document.getElementById('controls');
const previewArea = document.getElementById('preview-area');
const componentTitle = document.getElementById('component-title');
const copyButton = document.getElementById('copyCode');

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const component = event.target.getAttribute('data-component');
        componentTitle.textContent = component.charAt(0).toUpperCase() + component.slice(1);
        previewArea.innerHTML = components[component];
        updateControls(component);
        updatePreview(component);
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
    });
});

function updateControls(component) {
    document.querySelectorAll('.form-group').forEach(control => control.style.display = 'none');
    document.getElementById('backgroundColor').parentElement.style.display = 'block';
    document.getElementById('textColor').parentElement.style.display = 'block';
    if (component !== 'navbar' && component !== 'anchor' && component !== 'image' && component !== 'ul' && component !== 'li' && component !== 'div') {
        document.getElementById('borderRadius').parentElement.style.display = 'block';
        document.getElementById('fontSize').parentElement.style.display = 'block';
    } else {
        document.getElementById('borderRadius').parentElement.style.display = 'none';
        document.getElementById('fontSize').parentElement.style.display = 'none';
    }
    document.getElementById('fontWeight').parentElement.style.display = 'block';
    document.getElementById('fontFamily').parentElement.style.display = 'block';
}

function updatePreview(component) {
    const previewElement = previewArea.firstElementChild;

    document.getElementById('backgroundColor').addEventListener('input', (e) => {
        previewElement.style.backgroundColor = e.target.value;
        if (component === 'navbar') {
            document.querySelectorAll('#preview-navbar .nav-link').forEach(link => link.style.backgroundColor = e.target.value);
        }
    });
    document.getElementById('textColor').addEventListener('input', (e) => {
        previewElement.style.color = e.target.value;
        if (component === 'navbar') {
            document.querySelectorAll('#preview-navbar .navbar-brand, #preview-navbar .nav-link').forEach(link => link.style.color = e.target.value);
        } else if (component === 'anchor') {
            previewElement.style.color = e.target.value;
        } else if (component === 'ul') {
            document.querySelectorAll('#preview-ul li').forEach(li => li.style.color = e.target.value);
        } else if (component === 'li') {
            previewElement.style.color = e.target.value;
        }
    });

    if (component !== 'navbar' && component !== 'anchor' && component !== 'image' && component !== 'ul' && component !== 'li' && component !== 'div') {
        document.getElementById('borderRadius').addEventListener('input', (e) => {
            previewElement.style.borderRadius = e.target.value + 'px';
        });

        document.getElementById('fontSize').addEventListener('input', (e) => {
            previewElement.style.fontSize = e.target.value + 'px';
        });
    }

    document.getElementById('fontWeight').addEventListener('input', (e) => {
        previewElement.style.fontWeight = e.target.value;
    });

    document.getElementById('fontFamily').addEventListener('input', (e) => {
        previewElement.style.fontFamily = e.target.value;
    });
}

copyButton.addEventListener('click', () => {
    const previewElement = previewArea.firstElementChild.outerHTML;
    navigator.clipboard.writeText(previewElement).then(() => {
        alert('Code copied to clipboard');
    });
});

document.querySelector('.nav-link').click();