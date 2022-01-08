import View from "./View";
import icons from '../../img/icons.svg';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recepies found for you query!Please try again ;)';
    _message = '';

    _generateMarkup(){
        return this._data.map(res => this._generateMarkupPreview(res)).join()
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

export default new ResultsView();