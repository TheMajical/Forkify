import View from "./View";
import icons from '../../img/icons.svg';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet! Find a nice one and bookmark it ;)';
    _message = '';

    _generateMarkup(){
        return this._data.map(res => this._generateMarkupPreview(res)).join()
    }

    addHandlerRender(handlder){
        window.addEventListener('load', handlder);
    }

    _generateMarkupPreview(result){
        const id = window.location.hash.slice(1);

        return `
        <li class="preview">
            <a class="preview__link ${result.id === id ? 'preview__link--active': ''}" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
              </div>
            </a>
          </li>
        `
    }

}

export default new BookmarksView();