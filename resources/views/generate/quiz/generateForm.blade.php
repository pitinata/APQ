@extends('basic')

@section('content')
    <div>
        <form method="POST" enctype="multipart/form-data" action="{{ route('quiz.generate') }}">
            @csrf
        <table>
            <tr>
                <th>Name</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Total Question</td>
                <td><input type="number" min="1" max="100" id="totalQuestion" name="totalQuestion" /></td>
            </tr>
            <tr>
                <td>Number in each question</td>
                <td><input type="number" min="2" max="4" id="totalNumber" name="totalNumber" /></td>
            </tr>
            <tr>
                <td>Digit per number</td>
                <td><input type="number" min="1" max="2" id="digitPerNumber" name="digitPerNumber" /></td>
            </tr>
            <tr>
                <td>Setting</td>
                <td>
                    <input type="checkbox" id="isMixDigit" name="isMixDigit" value="1" />
                    <label for="isMixDigit">Mix numbers of digit</label><br/>

                    <input type="checkbox" id="isPositiveOnly" name="isPositiveOnly" value="1" />
                    <label for="isPositiveOnly">Positive answer only</label><br/>

                </td>
            </tr>
            <tr>
                <td>Operator</td>
                <td>
                    <input type="checkbox" id="plus" name="operator[0]" value="+"/>
                    <label for="plus">Addition</label><br/>
                    <input type="checkbox" id="minus" name="operator[1]" value="-"/>
                    <label for="minus">Subtraction</label><br/>
                    <input type="checkbox" id="multiply" name="operator[2]" value="*"/>
                    <label for="multiply">Multiplication</label><br/>
                    <input type="checkbox" id="divide" name="operator[3]" value="/"/>
                    <label for="divide">Division</label><br/>
                </td>
            </tr>
        </table>

        <button type="submit" name="generate">Generate</button>
    </div>
    @if($errors->any())
        <div style="color: red;">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
@endsection
