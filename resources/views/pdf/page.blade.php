<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>APQ Question Page Generator</title>
    <style type="text/css">
        @page question {
            size: A4 portrait;
            margin: 1cm;
        }

        .questionPage{
            page: question;
            page-break-after: always;
            height: 25.5cm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .topDiv{
            display: flex;
            justify-content: space-between;
        }

        .topDiv > div{
            width: 33.33%;
        }

        .bodyDiv{

        }

        .bottomDiv{
            /* position: absolute;
            bottom: 0;
            width: 95%; */
        }

        .bottomDiv > .sub2{
            display: flex;
            justify-content: space-between;
        }

    </style>
</head>
<body>
    @if(isset($setting) && isset($paper))
        @if(count($quizzes) > 0)
            @foreach (array_chunk($quizzes, 36) as $quizChunk)
                <div class="questionPage">

                    <div>
                        <div class="topDiv">
                            <div>Quiz Paper #{{ $paper->paper_id }}</div>
                            <div style="text-align: center">{{ $loop->iteration }}</div>
                            <div style="text-align: right">Created Date: {{ \Carbon\Carbon::parse($paper->created_at)->format('d/m/Y') }}</div>
                        </div>

                        <div class="bodyDiv">
                            <hr>
                            <table style="width: 100%; table-layout: fixed; font-family: 'Cambria Math', sans-serif; font-size:28px; line-height: 2;">
                                @for ($i = 0; $i < 12; $i++)
                                    <tr>
                                        @if(array_key_exists($i,$quizChunk))
                                            <td>{{ $quizChunk[$i]->quizNumber }}. {{ $quizChunk[$i]->quizString }}=</td>
                                        @else
                                            <td></td>
                                        @endif

                                        @if(array_key_exists(12+$i,$quizChunk))
                                            <td>{{ $quizChunk[12+$i]->quizNumber }}. {{ $quizChunk[12+$i]->quizString }}=</td>
                                        @else
                                            <td></td>
                                        @endif

                                        @if(array_key_exists(24+$i,$quizChunk))
                                            <td>{{ $quizChunk[24+$i]->quizNumber }}. {{ $quizChunk[24+$i]->quizString }}=</td>
                                        @else
                                            <td></td>
                                        @endif
                                    </tr>
                                @endfor
                            </table>
                        </div>
                    </div>

                    @if($setting["showAnswer"] == true)
                        <div class="bottomDiv">
                            <div class="sub1">
                                <hr>
                                <h1>Answer</h1>
                            </div>
                            <div class="sub2">
                                <table style="table-layout: fixed; width:100%;">
                                    @foreach (array_chunk($quizChunk, 12) as $subQuizChunk)
                                    <tr>
                                        @foreach ($subQuizChunk as $quiz)
                                        <td>{{ $quiz->quizNumber }}. {{ $quiz->answer }}</td>
                                        @endforeach
                                    </tr>
                                    @endforeach
                                </table>
                            </div>
                        </div>
                    @endif

                </div>
            @endforeach
        @endif
    @endif



</body>
</html>
