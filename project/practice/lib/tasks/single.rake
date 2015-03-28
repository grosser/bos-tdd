#lib/tasks/run_single.rake
# Run specific testcase/tests or spec/example
#
# test: search in test/ unit functional integration
# spec: search in spec/ models controllers views helpers
#
# rake test:blog
# => Runs the full BlogTest unit test
#
# rake test:blog:create
# => Runs the tests matching /create/ in the BlogTest unit test
#
# rake spec:blog:create
# => Runs the first example matching /create/ in Blog spec
#
# rake test:u
# => run the first file matching u*_test.rb
#
# rake test:blog_C or test:blog_
# => Runs all tests in the BlogControllerTest functional test

rule "" do |t|
  def find_example_in_spec file, test_name
    File.readlines(file).each do |line|
      if line =~ /.*it(.*#{test_name}.*) do/
        return $1.strip.tr('\'"','')
      end
    end
    test_name
  end

  # test:file:method
  if t.name =~ /(spec|test):(.*)(:([^.]+))?$/
    search_order = {
      'test'=> %w(unit functional integration *),
      'spec'=> %w(models controllers views helpers *),
    }

    #collect input
    type = $1
    arguments = t.name.split(":")[1..-1]
    file_name = arguments.first.sub(/_C$/,'_controller')
    test_name = arguments[1..-1].to_s

    #find the file
    file = nil
    search_order[type].each do |folder|
      FileList["#{RAILS_ROOT}/#{type}/#{folder}/**/#{file_name}*_#{type}.rb"].each do |found|
        file = found
        break
      end
      break if file
    end

    if file
      #when spec, convert test_name regex to actual test_name
      test_name = find_example_in_spec(file,test_name) if type == 'spec' && !test_name.empty?

      #run the file
      case type
      when 'test' then sh "ruby -Ilib:test #{file} -n /#{test_name}/"
      when 'spec' then sh "script/spec -O spec/spec.opts #{file}" + \
        (test_name.empty? ? "":" -e '#{test_name}'")
      end
    end
  end
end