function posts = sortPosts(posts)
% posts = sortPosts

months = { 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' };

order = [];
for i=1:length(posts)
    
    d = regexp(posts{i}.date,' ', 'split');
    t = regexp(d{5}, ':', 'split');
    
    n = datenum( str2num(d{4}), find(strcmp(months, lower(d{3}))), str2num(d{2}), ...
                str2num(t{1}), str2num(t{2}), str2num(t{3}) );
            
    order = [ order ; i n ];
end

order = sortrows(order, -2);
posts = posts(order(:,1));

end