function rss_generate(location)
% rss_generate(location)


addpath('util')
rss = fopen(sprintf('/Users/Gene/Web/Home/_site/%s', location), 'w');

fprintf(rss, '<?xml version="1.0" encoding="UTF-8"?>\n');
fprintf(rss, '<rss version="2.0"\n');
fprintf(rss, '\txmlns:content="http://purl.org/rss/1.0/modules/content/"\n');
fprintf(rss, '\txmlns:wfw="http://wellformedweb.org/CommentAPI/"\n');
fprintf(rss, '\txmlns:dc="http://purl.org/dc/elements/1.1/"\n');
fprintf(rss, '\txmlns:atom="http://www.w3.org/2005/Atom"\n');
fprintf(rss, '>\n\n');

% get date string for last build date
[d w] = weekday(now);
datestring = sprintf('%s, %s +0930', w, regexprep(datestr(now),'-',' '));

% write down channel info
fprintf(rss, '<channel>\n');
fprintf(rss, '\t<title>Gene Kogan</title>\n');
fprintf(rss, '\t<link>http://www.genekogan.com/</link>\n');
fprintf(rss, '\t<atom:link href="http://www.genekogan.com/rss/rss2.xml" rel="self" type="application/rss+xml" />\n');
fprintf(rss, '\t<description>Works by programmer and artist, Gene Kogan</description>\n');
fprintf(rss, '\t<lastBuildDate>%s</lastBuildDate>\n', datestring);
fprintf(rss, '\t<language>en</language>\n\n');

% parse posts folder and order it by most recent
posts = [];
postfolder = dir('components/*post_*.txt');
for i=1:length(postfolder)
    posts{i} = parsePost(['components/' postfolder(i).name]);
end
posts = sortPosts(posts);

% make an entry for each post
for i=1:length(posts)    
    fprintf(rss, '\t<item>\n');
    fprintf(rss, '\t\t<title>%s</title>\n', posts{i}.title);
    fprintf(rss, '\t\t<guid isPermaLink="true">%s</guid>\n', posts{i}.permalink);
    fprintf(rss, '\t\t<link>%s</link>\n', posts{i}.link);
    fprintf(rss, '\t\t<pubDate>%s</pubDate>\n', posts{i}.date);  % e.g. Wed, 30 Apr 2009 23:00:00 +1100
    fprintf(rss, '\t\t<description><![CDATA[ %s ]]></description>\n', posts{i}.contentRSS);
    fprintf(rss, '\t</item>\n\n');
end
	
fprintf(rss, '\n</channel>\n');
fprintf(rss, '</rss>\n');

% put command for sftp
fprintf('put /Users/Gene/Web/Home/_site/%s public_html/home/%s\n', location, location);

fclose(rss);
