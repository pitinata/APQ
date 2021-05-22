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
                <td><input type="number" min="1" max="1000" id="totalQuestion" name="totalQuestion" /></td>
            </tr>
            <tr>
                <td>Number in each question</td>
                <td><input type="number" min="2" max="5" id="totalNumber" name="totalNumber" /></td>
            </tr>
            <tr>
                <td>Digit per number</td>
                <td><input type="number" min="1" max="10" id="digitPerNumber" name="digitPerNumber" /></td>
            </tr>
            <tr>
                <td>Digit mode</td>
                <td>
                    <input type="radio" id="nomix" name="isMixDigit" value="0">
                    <label for="nomix">Same numbers of digit</label><br/>
                    <input type="radio" id="mix" name="isMixDigit" value="1">
                    <label for="mix">Mix numbers of digit</label><br/>
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
