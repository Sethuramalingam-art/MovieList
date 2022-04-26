import movieapi from '../common/apis/MovieApi';
import { APIKey } from '../common/apis/MovieApiKey';

class BooksDataService {
          get(term) {
                    return movieapi.get(
                              `?apiKey=${APIKey}&s=${term}&type=movie`
                    );
          }
          create(data) {
                    return movieapi.post(); // here omdbapi dont have post so emptied URL for learning
          }
}

export default new BooksDataService();
