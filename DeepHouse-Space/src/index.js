const searchSongs = (allSongs, setFilteredSongs, songInput) => {
    if (songInput.trim() !== '') {
        const filteredData = allSongs.filter(filteredItem => {
            
            return Object.values(filteredItem).some(value =>
                String(value).toLowerCase().includes(songInput.toLowerCase())
            );
        });
        setFilteredSongs(filteredData);
    } else {
        setFilteredSongs([]);
    }
};

const downloadSong = (downloadLink) => {
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = "";
    link.click();
};

export { searchSongs, downloadSong }