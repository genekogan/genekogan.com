function post = makeBlogPosts()


% load all writing posts
wdir = dir('components/writing_post*');
writings = [];
for i=1:length(wdir)
    writings{i} = parsePost([ 'components/' wdir(i).name ]);
end
writings = sortPosts(writings);


% compile all writings into one post
post.content = [];
post.contentRSS = [];
post.include = [];
post.imagedir = [];
post.codedir = [];
post.title = 'Writing | Gene Kogan';
post.date = writings{end}.date;
post.type = 'writing_main';
post.description = 'Writings by Gene Kogan';

for i=1:length(writings)
    % parse date
    wdate = regexp(writings{i}.date,' ','split');
    wdate = sprintf('%s %s %s', wdate{2}, wdate{3}, wdate{4});
    
    % concatenate content
    post.content = [ post.content' ;
                    sprintf('\t\t\t<h5>%s</h5>\n', wdate) ;
                    sprintf('\t\t\t<h1><a href="%s">%s</a></h1>\n', writings{i}.relative_link, writings{i}.title) ;
                    writings{i}.content' ; '<p/><p/><hr width="90%" align="center"><p/>' ]';    
    
    % inclusions
    post.include = unique([ post.include writings{i}.include ]);
    post.imagedir = unique([ post.imagedir writings{i}.imagedir ]);
    post.codedir = unique([ post.codedir writings{i}.codedir ]);
end
