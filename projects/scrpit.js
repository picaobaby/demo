var fs = require('fs'),   
    os = require('os'), 
    file_txt = 'ch.txt', 
    file_ass = 'en.ass',
    file_result = 'result.txt',
    separator = '[Events]',
    pos = 48,   // ts and text content, separated by `,,` 
    content = [],
    lines_en = [],
    arr_en = [],
    arr_ch = [],
    arr_ts = [], 
    arr_xx = [],
    temp, line, 
    result ='', 
    temp2;

// read CH text file into array of lines 
arr_ch = fs.readFileSync(file_txt, 'utf-8').trim().split(os.EOL);

// read EN ass file, find the [xx]
// not sure why using async here, not before ...
fs.readFile(file_ass, 'utf-8', function(err, data) {
    if (err) {
        console.log(err);
        return;
    } 

    content = data.split(separator);
    temp = content[1].trim();       // remove first line which is empty line,
    lines_en = temp.split(os.EOL);     // break into lines
    lines_en.shift();                  // remove first line, csv title line
                                    // cannot temp.split(xx).shift(), why ???, I see, temp was arr first...

    // each line, break into ts, and real en text
    for (var i = 0; i < lines_en.length; i++) {
        line = lines_en[i].trim();
        // pos = line.lastIndexOf(',,');   // always 48, so no need for lastIndexOf()
        // ts = line.substr(0, pos + 2);    // +2, for length
        // en = line.substr( pos + 2 );    // +2, cause 2 is index, not length

        arr_ts.push(line.substr(0, pos + 2));
        arr_en.push(line.substr(pos + 2));
    }

    // combine en/ch, to create ... 
    for (var i = 0; i < arr_en.length; i++ ) {
        result += '<section>\n'
            + arr_en[i] + '<br>\n'
            + arr_ch[i] + '\n'
            + '</section>\n';
    }
    fs.writeFileSync(file_result, result.trim());
});