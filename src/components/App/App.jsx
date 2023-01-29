import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { Modal } from 'components/Modal/Modal';
import { fetchGallery } from 'components/servises/API';

import { Circles } from 'react-loader-spinner';
import { AppBox, Button } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [per_page, setPer_page] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(5);
  const [showButton, setShowButton] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  //const [page, setPage] = useState(1);

  useEffect(() => {
    async function handlefetchGallery() {
      try {
        setIsLoading(true);
        setError(null);

        const galleryImg = await fetchGallery(searchQuery, per_page);

        if (!searchQuery) {
          console.log(22);
          return;
        } else {
          console.log(55);
          setGallery(galleryImg.hits);
        }

        if (1 <= galleryImg.totalHits / per_page) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
        if (galleryImg.totalHits === 0) {
          console.log(galleryImg.totalHits);
          setError('Not found. Try another value');
        }
      } catch {
        setError('Error 😒. Please reload page 👍');
      } finally {
        setIsLoading(false);
      }
    }
    handlefetchGallery(searchQuery, per_page);
  }, [searchQuery, per_page]);

  const onSearch = searchValue => {
    setSearchQuery(searchValue);
    setPer_page(12);
    setGallery([]);
  };

  const onLoadMore = () => {
    setPer_page(prevState => prevState + 12);
  };

  const onImgClick = url => {
    setLargeImageUrl(url);
  };

  const onModalClose = () => {
    setLargeImageUrl(null);
  };

  return (
    <AppBox className="App">
      <Searchbar onSubmit={onSearch} />
      {error && <p>{error}</p>}
      {isLoading && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      <ImageGallery gallery={gallery} onClick={onImgClick} />
      {showButton && (
        <Button type="button" onClick={onLoadMore}>
          Load more
        </Button>
      )}
      {largeImageUrl && (
        <Modal
          onClose={onModalClose}
          largeImageUrl={largeImageUrl}
          searchQuery={searchQuery}
        ></Modal>
      )}
    </AppBox>
  );
};

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     gallery: [],
//     isLoading: false,
//     error: null,
//     largeImageUrl: null,
//     page: 1,
//     per_page: 12,
//     showButton: false,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { searchQuery, per_page, page } = this.state;

//     if (
//       prevState.searchQuery !== searchQuery ||
//       prevState.per_page !== per_page
//     ) {
//       try {
//         this.setState({ isLoading: true, error: null });
//         const gallery = await fetchGallery(searchQuery, per_page);
//         this.setState({ gallery: gallery.hits });

//         if (page <= gallery.totalHits / this.state.per_page) {
//           this.setState({ showButton: true });
//         } else {
//           this.setState({ showButton: false });
//         }
//         if (gallery.hits.length === 0) {
//           this.setState({
//             error: 'Not found. Try another value',
//           });
//         }
//       } catch (error) {
//         this.setState({
//           error: 'Error 😒. Please reload page 👍',
//         });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }
//   onSearch = searchValue => {
//     this.setState({
//       searchQuery: searchValue,
//       per_page: 12,
//       gallery: [],
//     });
//   };
//   onLoadMore = () => {
//     console.log(this.state.per_page);
//     this.setState(prevState => ({
//       per_page: prevState.per_page + 12,
//     }));
//   };

//   onImgClick = url => {
//     this.setState({
//       largeImageUrl: url,
//     });
//   };
//   onModalClose = () => {
//     this.setState({
//       largeImageUrl: null,
//     });
//   };

//   render() {
//     const { isLoading, error, largeImageUrl, searchQuery, showButton } =
//       this.state;

//     return (
//       <AppBox className="App">
//         <Searchbar onSubmit={this.onSearch} />
//         {error && <p>{error}</p>}
//         {isLoading && (
//           <Circles
//             height="80"
//             width="80"
//             color="#4fa94d"
//             ariaLabel="circles-loading"
//             wrapperStyle={{}}
//             wrapperClass=""
//             visible={true}
//           />
//         )}
//         <ImageGallery gallery={this.state.gallery} onClick={this.onImgClick} />
//         {showButton && (
//           <Button type="button" onClick={this.onLoadMore}>
//             Load more
//           </Button>
//         )}
//         {largeImageUrl && (
//           <Modal onClose={this.onModalClose}>
//             <img src={largeImageUrl} alt={searchQuery} width="600" />
//           </Modal>
//         )}
//       </AppBox>
//     );
//   }
// }
