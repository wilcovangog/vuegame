const apiCalls = {
  getRoutes() {
    return [
      // left to right routes
      ['5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7', '5-8', '5-9', '5-10', '5-11', '5-12', '5-13'],
      ['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7', '10-8', '10-9', '10-10', '10-11', '10-12', '10-13'],
      // right to left routes
      ['4-13', '4-12', '4-11', '4-10', '4-9', '4-8', '4-7', '4-6', '4-5', '4-4', '4-3', '4-2', '4-1'],
      ['9-13', '9-12', '9-11', '9-10', '9-9', '9-8', '9-7', '9-6', '9-5', '9-4', '9-3', '9-2', '9-1'],
      // top to bottom
      ['1-4', '2-4', '3-4', '4-4', '5-4', '6-4', '7-4', '8-4', '9-4', '10-4', '11-4', '12-4', '13-4'],
      ['1-9', '2-9', '3-9', '4-9', '5-9', '6-9', '7-9', '8-9', '9-9', '10-9', '11-9', '12-9', '13-9'],
      // bottom to top
      ['13-5', '12-5', '11-5', '10-5', '9-5', '8-5', '7-5', '6-5', '5-5', '4-5', '3-5', '2-5', '1-5'],
      ['13-10', '12-10', '11-10', '10-10', '9-10', '8-10', '7-10', '6-10', '5-10', '4-10', '3-10', '2-10', '1-10'],
    ];
  },
  getPuzzle() {
    return {
      board: {
        rows: [
          'VDNETNORFC',
          'FUOLSOURCE',
          'ADEYETAOUM',
          'CTLTRMNCNO',
          'ECGSEAGOMB',
          'BAOWAEUDDG',
          'OEONTGLINE',
          'ORGSARANRN',
          'KEXUDERGAC',
          'OOLIBRARYL',
        ],
        width: 10,
        height: 10,
      },
      words: [
        {word: 'FRONTEND', location: '01020103010401050106010701080109', found: false},
        {word: 'LIBRARY', location: '1003100410051006100710081009', found: false},
        {word: 'FRAMEWORK', location: '010902080307040605050604070308020901', found: false},
        {word: 'VUE', location: '010102020303', found: false},
        {word: 'REACT', location: '04020502060207020802', found: false},
        {word: 'ANGULAR', location: '0307040705070607070708070907', found: false},
        {word: 'REDUX', location: '09030904090509060907', found: false},
        {word: 'SAGA', location: '0504060507060807', found: false},
        {word: 'GOOGLE', location: '030304030503060307030803', found: false},
        {word: 'FACEBOOK', location: '02010301040105010601070108010901', found: false},
        {word: 'STYLE', location: '01040204030404040504', found: false},
        {word: 'NODE', location: '0407050806090710', found: false},
        {word: 'MOBGEN', location: '031004100510061007100810', found: false},
        {word: 'CODING', location: '040805080608070808080908', found: false},
        {word: 'SOURCE', location: '020502060207020802090210', found: false},
        {word: 'YARN', location: '0709080909091009', found: false},
      ],
    };
  }
};

export default apiCalls;
