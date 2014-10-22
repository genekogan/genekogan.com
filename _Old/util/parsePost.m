function post = parsePost(postpath)
% post = parsePost(path)


fid = fopen(postpath, 'r');
post.content = [];
post.contentRSS = [];
post.include = [];
post.imagedir = [];
post.codedir = [];

while 1
    tline = fgetl(fid);
    if ~ischar(tline), break, end

    % search for metadata
    if regexp(tline, '<!title>(.*)</!title>')  
        post.title = regexprep( regexprep(tline, '</!title>', ''), '<!title>', '');

    elseif regexp(tline, '<!description>(.*)</!description>')
        post.description = regexprep( regexprep(tline, '</!description>', ''), '<!description>', '');
    
    elseif regexp(tline, '<!date>(.*)</!date>')
        post.date = regexprep( regexprep(tline, '</!date>', ''), '<!date>', '');

    elseif regexp(tline, '<!type>(.*)</!type>')
        post.type = regexprep( regexprep(tline, '</!type>', ''), '<!type>', '');

    elseif regexp(tline, '<!include>(.*)</!include>')
        include = regexprep( regexprep(tline, '</!include>', ''), '<!include>', '');
        post.include{ length(post.include)+1 } = include;

    elseif regexp(tline, '<!link>(.*)</!link>')
        post.relative_link = regexprep( regexprep(tline, '</!link>', ''), '<!link>', '');

    % otherwise it's content
    else
        post.content{ length(post.content) + 1 } = tline;
        post.contentRSS = [ post.contentRSS tline ];
    end
    
    % search for images, code to upload
    if strfind(tline, '<img src="/images/')
        tokens = regexp(tline,'"/images/([^">]+)"', 'tokens');
        for i=1:length(tokens)
            imgsubdir = regexp(tokens{i},'/','split');
            post.imagedir{length(post.imagedir)+1} = imgsubdir{1}{1};
        end    
    elseif strfind(tline, '="/code/')
        tokens = regexp(tline,'"/code/([^">]+)"', 'tokens');
        for i=1:length(tokens)
            codesubdir = regexp(tokens{i},'/','split');
            post.codedir{length(post.codedir)+1} = codesubdir{1}{1};
        end    
    end

end
fclose(fid);

% image and code directories
post.imagedir = unique(post.imagedir);
post.codedir = unique(post.codedir);

% link and permalink
titletxt = postpath;
titletxt = regexprep( regexprep(titletxt, 'components/post_', ''), '.txt', '');

if find(strcmp({ 'experiments', 'works', 'blog' }, post.type))
    post.link = [ 'http://www.genekogan.com/' post.type '/' titletxt '.html' ];
    post.permalink = [ 'http://www.genekogan.com/' post.type '/' titletxt '.html' ];
elseif find(strcmp({ 'writing' }, post.type))
    post.link = [ 'http://www.genekogan.com' post.relative_link ];
    post.permalink = [ 'http://www.genekogan.com' post.relative_link ];
end


% for RSS content, make some changes (this doesn't seem to be necessary at the moment)
post.contentRSS = regexprep( post.contentRSS, '"images/', '"http://www.genekogan.com/images/' );
post.contentRSS = regexprep( post.contentRSS, '"/images/', '"http://www.genekogan.com/images/' );
post.contentRSS = regexprep( post.contentRSS, '"../images/', '"http://www.genekogan.com/images/' );
post.contentRSS = regexprep( post.contentRSS, '"experiments/', '"http://www.genekogan.com/experiments/' );
post.contentRSS = regexprep( post.contentRSS, '"/experiments/', '"http://www.genekogan.com/experiments/' );
post.contentRSS = regexprep( post.contentRSS, '"../experiments/', '"http://www.genekogan.com/experiments/' );
post.contentRSS = regexprep( post.contentRSS, '"works/', '"http://www.genekogan.com/works/' );
post.contentRSS = regexprep( post.contentRSS, '"/works/', '"http://www.genekogan.com/works/' );
post.contentRSS = regexprep( post.contentRSS, '"../works/', '"http://www.genekogan.com/works/' );
post.contentRSS = regexprep( post.contentRSS, '"code/', '"http://www.genekogan.com/code/' );
post.contentRSS = regexprep( post.contentRSS, '"/code/', '"http://www.genekogan.com/code/' );
post.contentRSS = regexprep( post.contentRSS, '"../code/', '"http://www.genekogan.com/code/' );

end

