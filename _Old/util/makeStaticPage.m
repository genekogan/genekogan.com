function makeStaticPage(input, output);
%  makeStaticPage2(input, output)
%    input is either a post structure as specified by parsePost(input)
%    or a path to a file containing the html for a post


% parse the post if input is a file path, if not just use it
if isstruct(input)
    post = input;
else
    post = parsePost(input);
end

fOut = fopen(['_site/' output], 'w');

%/////////////////
% HTML declaration
%/////////////////

fprintf(fOut,'<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"\n');
fprintf(fOut,'   "http://www.w3.org/TR/html4/loose.dtd">\n\n');
fprintf(fOut,'<html lang="en">\n');
fprintf(fOut,'<head>\n');


%/////////////////
% Header
%/////////////////

fprintf(fOut, '\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n');
fprintf(fOut, '\t<meta http-equiv="Description" content="%s" />\n', post.description);
fprintf(fOut, '\t<meta name="author" content="Gene Kogan">\n');
if find(strcmp(post.type, 'main'))
	fprintf(fOut, '\t<title>%s</title>\n', post.title);
else
	fprintf(fOut, '\t<title>%s | Gene Kogan</title>\n', post.title);
end
fprintf(fOut, '\t<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="http://www.genekogan.com/rss/rss2.xml" />\n'); 



%/////////////////
% Stylesheets
%/////////////////

fprintf(fOut, '\t<link href="/css/style.css" rel="stylesheet" type="text/css" />\n');
if find(strcmp(post.include, 'isotope'))
    fprintf(fOut, '\t<link href="/css/isotope.css" rel="stylesheet" />\n');
end
if find(strcmp(post.include, 'lightbox'))
    fprintf(fOut, '\t<link href="/css/lightbox.css" rel="stylesheet" />\n');
end



%/////////////////
% Scripts
%/////////////////

if find(strcmp(post.include, 'jquery'))
    fprintf(fOut, '\t<script type="text/javascript" src="/js/jquery-1.7.2.min.js"></script>\n');
end
if find(strcmp(post.include, 'isotope'))
    fprintf(fOut, '\t<script type="text/javascript" src="/js/jquery.isotope.min.js"></script>\n');
end
if find(strcmp(post.include, 'lightbox'))
    fprintf(fOut, '\t<script type="text/javascript" src="/js/lightbox.js"></script>\n');
end
if find(strcmp(post.include, 'processingjs'))
    fprintf(fOut, '\t<script type="text/javascript" src="/js/processing-1.3.6.min.js"></script>\n');
end


%/////////////////
% Header -> Body
%/////////////////

fprintf(fOut,'\n</head>\n');
fprintf(fOut,'<body>\n');
fprintf(fOut,'\t<div id="container">\n');
fprintf(fOut,'\t\t<div id="header">\n');


%/////////////////
% Main menu bar
%/////////////////

menu_class_works = '';
menu_class_writing = '';
menu_class_about = '';

if find(strcmp(post.type, 'main'))
    menu_class_works = 'class="current"';
elseif find(strcmp(post.type, 'writing_main'))
    menu_class_writing = 'class="current"';
elseif find(strcmp(post.type, 'about'))
    menu_class_about = 'class="current"';
end

fprintf(fOut, '\t\t\t<div id="name">\n');
fprintf(fOut, '\t\t\t\t<h1>Gene Kogan</h1>\n');
fprintf(fOut, '\t\t\t</div>\n');
fprintf(fOut, '\t\t\t<div id="menucontainer">\n');
fprintf(fOut, '\t\t\t\t<div id="menudiv">\n');
fprintf(fOut, '\t\t\t\t\t<ul id="menu">\n');
fprintf(fOut, '\t\t\t\t\t\t<li><a href="/" %s>Works</a></li>\n', menu_class_works);
fprintf(fOut, '\t\t\t\t\t\t<li><a href="/writing/" %s>Writing</a></li>\n', menu_class_writing);
fprintf(fOut, '\t\t\t\t\t\t<li><a href="/about.html" %s>About</a></li>\n', menu_class_about);
fprintf(fOut, '\t\t\t\t\t\t<li><a href="/rss/rss2.xml" ><img src="/images/misc/rss.jpg" alt="RSS" /></a></li>\n');
fprintf(fOut, '\t\t\t\t\t</ul>\n');
fprintf(fOut, '\t\t\t\t</div>\n');
fprintf(fOut, '\t\t\t\t<div id="socialdiv">\n');
if ~isequal(post.type,'about')              % skip social menu for about page
    fprintf(fOut, '\t\t\t\t\t<ul id="social">\n');
    fprintf(fOut, '\t\t\t\t\t\t<li><a href="http://www.flickr.com/photos/genekogan/"><img src="/images/misc/icon_flickr.png" alt="Flickr" /></a></li>\n');
    fprintf(fOut, '\t\t\t\t\t\t<li><a href="http://www.vimeo.com/genekogan"><img src="/images/misc/icon_vimeo.png" alt="Vimeo" /></a></li>\n');
    fprintf(fOut, '\t\t\t\t\t\t<li><a href="http://www.soundcloud.com/genekogan"><img src="/images/misc/icon_soundcloud.png" alt="SoundCloud" /></a></li>\n');
    fprintf(fOut, '\t\t\t\t\t\t<li><a href="http://www.github.com/genekogan"><img src="/images/misc/icon_github.png" alt="GitHub" /></a></li>\n');
    fprintf(fOut, '\t\t\t\t\t\t<li><a href="http://www.openprocessing.org/user/19808"><img src="/images/misc/icon_openprocessing.png" alt="OpenProcessing" /></a></li>\n');
    fprintf(fOut, '\t\t\t\t\t\t<li><a href="http://www.twitter.com/genekogan"><img src="/images/misc/icon_twitter.png" alt="Twitter" /></a></li>\n');
    fprintf(fOut, '\t\t\t\t\t</ul>\n');
end
fprintf(fOut, '\t\t\t\t</div>\n');
fprintf(fOut, '\t\t\t</div>\n');
fprintf(fOut,'\t\t</div>\n');



%/////////////////
% Content
%/////////////////

fprintf(fOut,'\t\t<div id="main">\n');

% if writing post, add date and title to top
if find(strcmp(post.type, 'writing'))
    wdate = regexp(post.date,' ','split');
    wdate = sprintf('%s %s %s', wdate{2}, wdate{3}, wdate{4});
    fprintf(fOut, '\t\t\t<h5>%s</h5>\n', wdate);
    fprintf(fOut, '\t\t\t<h1>%s</h1>\n', post.title);
end

% main content
for i=1:length(post.content)
    fprintf(fOut, '\t\t\t%s\n', post.content{i});
end
fprintf(fOut,'\t\t</div>\n');
fprintf(fOut,'\t</div>\n\n');



%/////////////////
% Google analytics
%/////////////////

fprintf(fOut, '\t<script type="text/javascript">\n');
fprintf(fOut, '\t\tvar _gaq = _gaq || [];\n');
fprintf(fOut, '\t\t_gaq.push([''_setAccount'', ''UA-33352395-1'']);\n');
fprintf(fOut, '\t\t_gaq.push([''_trackPageview'']);\n');
fprintf(fOut, '\t\t(function() {\n');
fprintf(fOut, '\t\t\tvar ga = document.createElement(''script''); ga.type = ''text/javascript''; ga.async = true;\n');
fprintf(fOut, '\t\t\tga.src = (''https:'' == document.location.protocol ? ''https://ssl'' : ''http://www'') + ''.google-analytics.com/ga.js'';\n');
fprintf(fOut, '\t\t\tvar s = document.getElementsByTagName(''script'')[0]; s.parentNode.insertBefore(ga, s);\n');
fprintf(fOut, '\t\t})();\n');
fprintf(fOut, '\t</script>\n');


%/////////////////
% End
%/////////////////

fprintf(fOut,'\n</body>\n');
fprintf(fOut,'</html>\n');

fclose(fOut);




%/////////////////
% SFTP commands
%/////////////////

dest = regexp(output, '/', 'split');
destfolder = '';
for i=1:length(dest)-1
    destfolder = sprintf('%s/%s', destfolder, dest{i});
end
pathfile = regexprep(dest{end},'.html','');

% initial sftp and put content
fprintf('sftp culturj2@culturehacking.fm\n')
fprintf('put /Users/Gene/Web/Home/_site/%s public_html/home%s\n', output, destfolder)

% put images
for i=1:length(post.imagedir)
    fprintf('mkdir public_html/home/images/%s\n', post.imagedir{i});
    fprintf('put -r /Users/Gene/Web/Home/_site/images/%s/* public_html/home/images/%s\n', post.imagedir{i}, post.imagedir{i})
end

% put code
for i=1:length(post.codedir)
    fprintf('mkdir public_html/home/Code/%s\n', post.codedir{i});
    fprintf('put -r /Users/Gene/Web/Home/_site/images/%s/* public_html/home/images/%s\n', post.codedir{i}, post.codedir{i})
end

% put thumbnail (if experiments)
if find(strcmp(post.type, 'experiments'))
    fprintf('put /Users/Gene/Web/Home/_site/images/experiments/thumb_%s.jpg public_html/home/images/experiments\n', pathfile);
end